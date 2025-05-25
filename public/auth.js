// auth.js
// Show different sections based on the sectionId
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section) => {
    section.classList.add('hidden');
  });

  const activeSection = document.getElementById(`${sectionId}-section`);
  if (activeSection) {
    activeSection.classList.remove('hidden');
  }
}

// Handle SignUp
function handleSignup() {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  // Validation
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Signup successful!');
        showSection('login');
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Handle Login
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        showSection('dashboard');
        document.getElementById('nav-login').classList.add('hidden');
        document.getElementById('nav-signup').classList.add('hidden');
        document.getElementById('nav-dashboard').classList.remove('hidden');
        document.getElementById('nav-logout').classList.remove('hidden');
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Handle Logout
function logout() {
  localStorage.removeItem('authToken');
  showSection('home');
  document.getElementById('nav-signup').classList.remove('hidden');
  document.getElementById('nav-login').classList.remove('hidden');
  document.getElementById('nav-dashboard').classList.add('hidden');
  document.getElementById('nav-logout').classList.add('hidden');
}
