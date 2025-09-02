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

// Smooth scroll function

 function smoothScrollTo(targetY, duration = 500) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * progress);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }

  // Scroll to .contact-section on button click
  document.querySelectorAll('.scrollToContact').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector('.contact-section');
      if (target) {
        const targetY = target.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetY, 600); // 600ms duration
      }
    });
  });

  // Smooth scroll for all anchor links starting with #
  document.querySelectorAll('a[href^="#"]:not(.scrollToContact)').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const targetY = target.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetY, 600); // 600ms duration
      }
    });
  });




document.addEventListener('DOMContentLoaded', () => {
  const hero_Btn = document.getElementById('pink');
  if (!hero_Btn) return; // safety check

  hero_Btn.addEventListener('click', function (e) {
    e.preventDefault();
    const link = this.getAttribute('data-url'); 

    this.classList.add('clicked');

    setTimeout(() => {
      window.location.href = link;
    }, 300);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const hero_Btn1 = document.getElementById('dark');
  if (!hero_Btn1) return; // prevent errors if button not found

  hero_Btn1.addEventListener('click', function (e) {
    e.preventDefault();

    this.classList.add('clicked');

    setTimeout(() => {
      const contact = document.getElementById('contact');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  });
});





document.addEventListener('DOMContentLoaded', () => {
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
});






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



