// main.js for portfolio website
console.log('Portfolio site loaded!');

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const icon = toggle.querySelector('i');

  // Load preference
  if (localStorage.getItem('theme') === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

  toggle.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitIcon = document.getElementById('submitIcon');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      // Show loading state
      submitBtn.disabled = true;
      submitText.textContent = 'Sending...';
      submitIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      formMessage.style.display = 'none';

      try {
        const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          // Success message
          formMessage.className = 'mt-3 alert alert-success';
          formMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i>' + result.message;
          formMessage.style.display = 'block';
          
          // Reset form
          contactForm.reset();
        } else {
          // Error message
          formMessage.className = 'mt-3 alert alert-danger';
          formMessage.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>' + result.message;
          formMessage.style.display = 'block';
        }
      } catch (error) {
        // Network error
        formMessage.className = 'mt-3 alert alert-danger';
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Network error. Please try again.';
        formMessage.style.display = 'block';
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitIcon.innerHTML = '<i class="fas fa-arrow-right"></i>';
      }
    });
  }

  // --- Scroll-triggered fade-in animation ---
  const animatedEls = document.querySelectorAll('.js-fadeInUp');
  if ('IntersectionObserver' in window && animatedEls.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fadeInUp-active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    animatedEls.forEach(el => el.classList.add('fadeInUp-active'));
  }

  // --- Mobile Menu Overlay ---
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const openMenuBtn = document.querySelector('.btn-outline-light.d-lg-none');
  const closeMenuBtn = document.getElementById('closeMobileMenu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  if (openMenuBtn && mobileMenuOverlay) {
    openMenuBtn.addEventListener('click', function() {
      mobileMenuOverlay.classList.add('open');
    });
  }
  if (closeMenuBtn && mobileMenuOverlay) {
    closeMenuBtn.addEventListener('click', function() {
      mobileMenuOverlay.classList.remove('open');
    });
  }
  if (mobileMenuLinks && mobileMenuOverlay) {
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('open');
      });
    });
  }
}); 