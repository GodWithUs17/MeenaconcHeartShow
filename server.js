// Error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', err => console.error('❌ Uncaught Exception:', err));
process.on('unhandledRejection', reason => console.error('❌ Unhandled Rejection:', reason));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Google Sheets API setup
const credentials = require('./credentials.json');
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const sheets = google.sheets({ version: 'v4', auth });


// ✅ Enable CORS for any localhost/127.0.0.1 port
app.use(cors({
  origin: [/^http:\/\/127\.0\.0\.1:\d+$/, /^http:\/\/localhost:\d+$/],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


// ✅ Test route for CORS
app.get('/ping', (req, res) => {
  res.json({ success: true, message: 'CORS is working 🎉' });
});

// ✅ CONTACT FORM Submission Route
app.post('/submit-form', async (req, res) => {
  const data = req.body;
  console.log('📥 Received form data:', data);

  try {
    // Save to local file
    let submissions = [];
    if (fs.existsSync('submissions.json')) {
      submissions = JSON.parse(fs.readFileSync('submissions.json', 'utf8'));
    }
    submissions.push(data);
    fs.writeFileSync('submissions.json', JSON.stringify(submissions, null, 2));

    // Google Sheets append
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A2:E',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[
          data.fullname,
          data.email,
          data.phone,
          data.interest,
          data.message
        ]]
      }
    });

    // ✅ Email notification to Admin
    const adminResult = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'meenaconcheartshow.ca@gmail.com', // your admin email
      subject: 'New Form Submission',
      text: `New form submission:\n
      \nFull Name: ${data.fullname}
      \nEmail: ${data.email}
      \nPhone: ${data.phone}
      \nInterest: ${data.interest}
      \nMessage: ${data.message}`
    });

    console.log('✅ Admin email sent:', adminResult.response);

    // ✅ Confirmation email back to User
    if (data.email && data.email.includes('@')) {
      await transporter.sendMail({
        from: `"Meenaconc Team" <${process.env.EMAIL_USER}>`,
        to: data.email,   // send to user
        subject: "🎉 We received your message!",
        html: `
          <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px;">
            <h2 style="color:#10b981;">Hi ${data.fullname || 'there'} 👋</h2>
            <p>Thanks for reaching out! We’ve received your message and will get back to you as soon as possible.</p>
            <p style="margin-top:20px;">Here’s a copy of your message:</p>
            <blockquote style="background:#f9f9f9; padding:10px; border-left:4px solid #10b981;">
              ${data.message}
            </blockquote>
            <p style="margin-top:30px;">Cheers,<br><strong>The Meenaconc Team</strong></p>
          </div>
        `
      });
      console.log(`✅ Confirmation email sent to user: ${data.email}`);
    }

    // Success response
    return res.status(200).json({ success: true, message: 'Form submitted and saved successfully!' });

  } catch (error) {
    console.error('❌ Error in POST /submit-form:', error);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});


// ✅ NEWSLETTER EMAIL SUBMISSION Route
app.post('/save-email', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // Save to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Emails!A2:A',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[email, new Date().toLocaleString()]]
      }
    });

    // ✅ 1. Notify Admin
    await transporter.sendMail({
      from: `"Meenaconc Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'meenaconcheartshow.ca@gmail.com',
      subject: "📰 New Newsletter Subscription",
      text: `New subscriber: ${email}`,
    });
    console.log(`✅ Admin notified of new subscriber: ${email}`);

    // ✅ 2. Send confirmation to Subscriber
    await transporter.sendMail({
      from: `"Meenaconc Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Thanks for Subscribing!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px;">
          <h2 style="color:#10b981;">Welcome to Meenaconc! 🎉</h2>
          <p>Thank you for subscribing to our updates. We’re excited to have you on board!</p>
          <p>You’ll now receive the latest <strong>news, events, and special updates</strong> directly to your inbox.</p>
          <p style="margin-top:20px;">Stay tuned for amazing things coming soon 🚀</p>
          <p style="margin-top:30px;">Cheers,<br><strong>The Meenaconc Team</strong></p>
          <hr style="margin-top:30px; border:none; border-top:1px solid #eee;" />
          <p style="font-size:12px; color:#777;">You received this email because you subscribed on our website. If this wasn’t you, kindly ignore this message.</p>
        </div>
      `,
    });
    console.log(`✅ Confirmation email sent to subscriber: ${email}`);

    return res.status(200).json({ message: 'Thanks for subscribing!' });

  } catch (error) {
    console.error('❌ Newsletter Error:', error.message);
    return res.status(500).json({ message: 'Failed to save email' });
  }
});


// ✅ START SERVER ONCE
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
