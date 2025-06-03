// Mobile menu toggle (add this if you want a hamburger menu)
function initMobileMenu() {
  const menuToggle = document.createElement('div');
  menuToggle.className = 'mobile-menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  
  const header = document.querySelector('header');
  header.insertBefore(menuToggle, header.firstChild);
  
  menuToggle.addEventListener('click', function() {
    document.body.classList.toggle('menu-open');
  });
}

// Initialize mobile-specific features
function initMobileFeatures() {
  if (window.innerWidth <= 768) {
    initMobileMenu();
    
    // Prevent zooming on input focus
    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('focus', function() {
        document.querySelector('meta[name="viewport"]')
          .setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      });
    });
  }
}

// Run on DOM load and window resize
document.addEventListener('DOMContentLoaded', function() {
  initMobileFeatures();
});

window.addEventListener('resize', function() {
  initMobileFeatures();
});

// Theme Switching
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

if (localStorage.getItem('quiz-theme') === 'dark') {
  body.classList.replace('light-mode', 'dark-mode');
  if (themeSwitch) themeSwitch.checked = true;
}

themeSwitch?.addEventListener('change', () => {
  if (themeSwitch.checked) {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('quiz-theme', 'dark');
  } else {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('quiz-theme', 'light');
  }
});

// Play Button and Username Handling
document.addEventListener('DOMContentLoaded', function() {
  const playNowBtn = document.getElementById('playNowBtn');
  const usernameSection = document.getElementById('usernameSection');
  const usernameInput = document.getElementById('usernameInput');
  const submitUsernameBtn = document.getElementById('submitUsernameBtn');

  if (playNowBtn && usernameSection) {
    playNowBtn.addEventListener('click', function() {
      document.querySelector('.welcome-card').style.display = 'none';
      usernameSection.style.display = 'block';
      usernameInput.focus();
    });
  }

  if (submitUsernameBtn && usernameInput) {
    function startQuiz() {
      const username = usernameInput.value.trim();
      if (username) {
        localStorage.setItem('quizUsername', username);
        window.location.href = 'levels.html';
      } else {
        alert('Please enter a nickname to continue');
      }
    }

    submitUsernameBtn.addEventListener('click', startQuiz);
    usernameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') startQuiz();
    });
  }
});