// Simulated user state
let isLoggedIn = false;
let currentUser = null;

// Show specific section
function showSection(sectionId) {
  const sections = ['home', 'about', 'signup', 'login', 'dashboard'];
  sections.forEach(id => {
    const section = document.getElementById(`${id}-section`);
    section.classList.toggle('hidden', id !== sectionId);
  });
}

// Update navigation based on login state
function updateNav() {
  document.getElementById('nav-signup').classList.toggle('hidden', isLoggedIn);
  document.getElementById('nav-login').classList.toggle('hidden', isLoggedIn);
  document.getElementById('nav-dashboard').classList.toggle('hidden', !isLoggedIn);
  document.getElementById('nav-logout').classList.toggle('hidden', !isLoggedIn);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Handle sign-up
function handleSignup() {
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

  // Reset error messages
  document.getElementById('signup-username-error').style.display = 'none';
  document.getElementById('signup-email-error').style.display = 'none';
  document.getElementById('signup-password-error').style.display = 'none';
  document.getElementById('signup-confirm-password-error').style.display = 'none';

  let isValid = true;

  // Client-side validation
  if (!username) {
    document.getElementById('signup-username-error').style.display = 'block';
    isValid = false;
  }
  if (!isValidEmail(email)) {
    document.getElementById('signup-email-error').style.display = 'block';
    isValid = false;
  }
  if (password.length < 6) {
    document.getElementById('signup-password-error').style.display = 'block';
    isValid = false;
  }
  if (password !== confirmPassword) {
    document.getElementById('signup-confirm-password-error').style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    // Simulate API call to backend
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
      .then(response => {
        if (!response.ok) throw new Error('Sign-up failed');
        return response.json();
      })
      .then(data => {
        alert('Sign-up successful! Please log in.');
        showSection('login');
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }
}

// Handle login
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  // Reset error messages
  document.getElementById('login-email-error').style.display = 'none';
  document.getElementById('login-password-error').style.display = 'none';

  let isValid = true;

  // Client-side validation
  if (!isValidEmail(email)) {
    document.getElementById('login-email-error').style.display = 'block';
    isValid = false;
  }
  if (!password) {
    document.getElementById('login-password-error').style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    // Simulate API call to backend
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (!response.ok) throw new Error('Login failed');
        return response.json();
      })
      .then(data => {
        isLoggedIn = true;
        currentUser = { username: data.username || email.split('@')[0] }; // Mock user data
        document.getElementById('user-username').textContent = currentUser.username;
        updateNav();
        showSection('dashboard');
      })
      .catch(error => {
        alert('Error: ' + error.message);
      });
  }
}

// Handle logout
function logout() {
  // Simulate API call to backend
  fetch('/api/logout', { method: 'POST' })
    .then(() => {
      isLoggedIn = false;
      currentUser = null;
      updateNav();
      showSection('home');
      alert('Logged out successfully');
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
}

// Initialize
showSection('home');
updateNav();