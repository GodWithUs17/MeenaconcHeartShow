// Meenaconc.js


// / Hamburger toggle for mobile nav
const hamburger = document.getElementById('hamburger-btn');
const nav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close nav when a link is clicked
const navLinks = nav.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});



// Scroll to contact section when button is clicked
$(document).ready(function () {
  $('.scrollToContact').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('.contact-section').offset().top
    }, 500);
  });
});

// Smooth scroll for anchor links
$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  var href = $(this).attr('href');
  var target = $(href);
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 'slow');
  }
});



const hero_Btn = document.getElementById('pink');

  hero_Btn.addEventListener('click', function (e) {
    e.preventDefault();
    const link = this.getAttribute('data-url'); // Get href

    this.classList.add('clicked');

        setTimeout(() => {
      window.location.href=link; // Navigate after animation
    }, 300); // Match animation duration

  });


const hero_Btn1 = document.getElementById('dark');

  hero_Btn1.addEventListener('click', function (e) {
    e.preventDefault();
    const link = this.getAttribute('data-url'); // Get href

    this.classList.add('clicked');

        setTimeout(() => {
    document.getElementById('contact').scrollIntoView({
      behavior: 'smooth'
    });
  }, 300);

  });


//   git init
// git add .
// git commit -m "Initial commit"






const buttons = document.getElementsByClassName('btn-card');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function (e) {
    e.preventDefault();
    const link = this.getAttribute('href'); // Get href

    this.classList.add('clicked');

        setTimeout(() => {
      window.location.href = link; // Navigate after animation
    }, 300); // Match animation duration

  });
}






document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.spinner');

  // Show loading spinner and disable button
  submitBtn.disabled = true;
  btnText.textContent = 'Sending...';
  spinner.style.display = 'inline-block';

  const formData = Object.fromEntries(new FormData(form));

  try {
    // ✅ Use absolute backend URL
    const res = await fetch('https://meenaconcheartshow.onrender.com/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    // ✅ Fix: use `res` instead of `response`
    const data = await res.json();

    if (res.ok && data.success) {
      showSuccessBox();
      form.reset();
    } else {
      alert('❌ ' + (data.message || 'Something went wrong.'));
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('❌ Submission failed. Please try again.');
  } finally {
    // Hide spinner and enable button
    submitBtn.disabled = false;
    btnText.textContent = '💌 Send Message';
    spinner.style.display = 'none';
  }
});

function showSuccessBox() {
  const box = document.getElementById('formSuccess');
  if (!box) return;

  box.style.display = 'block';
  setTimeout(() => {
    box.classList.add('visible');
  }, 50);

  // Fade out after 4 seconds
  setTimeout(() => {
    box.classList.remove('visible');
    setTimeout(() => {
      box.style.display = 'none';
    }, 400);
  }, 4000);
}

// =======================
// Newsletter Subscribe
// =======================
document.getElementById('subscribeForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('subscriberEmail').value.trim();
  const spinner = document.querySelector('#subscribeBtn .spinner');
  const btnText = document.querySelector('#subscribeBtn .btn-text');
  const alertBox = document.getElementById('subscribeSuccess');

  if (!email) return;

  // Show spinner
  spinner.style.display = 'inline-block';
  btnText.textContent = 'Submitting...';

  try {
    const res = await fetch('https://meenaconcheartshow.onrender.com/save-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      alertBox.textContent = '✅ Subscribed successfully!';
      alertBox.style.color = 'green';
      alertBox.style.display = 'block';
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 4000);
      document.getElementById('subscribeForm').reset();
    } else {
      alertBox.textContent = '❌ Failed to subscribe.';
      alertBox.style.color = 'red';
      alertBox.style.display = 'block';
    }
  } catch (err) {
    alertBox.textContent = '❌ Network error.';
    alertBox.style.color = 'red';
    alertBox.style.display = 'block';
  } finally {
    spinner.style.display = 'none';
    btnText.textContent = 'Subscribe';
  }
});



