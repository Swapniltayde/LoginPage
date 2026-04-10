const API_BASE_URL = '/api';

// Display message in UI
function showMessage(elementId, text, isError = false) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = text;
    el.className = `message ${isError ? 'error' : 'success'}`;
}

// Register functionality
async function register(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        showMessage('registerMsg', 'All fields are required.', true);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            showMessage('registerMsg', 'Registration successful! Redirecting...', false);
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            const errorMsg = await response.text();
            showMessage('registerMsg', errorMsg, true);
        }
    } catch (err) {
        showMessage('registerMsg', 'Network error occurred. Make sure backend is running.', true);
    }
}

// Login functionality
async function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showMessage('loginMsg', 'All fields are required.', true);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const user = await response.json();
            // Store user info safely in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            const errorMsg = await response.text();
            showMessage('loginMsg', errorMsg, true);
        }
    } catch (err) {
        showMessage('loginMsg', 'Network error occurred. Make sure backend is running.', true);
    }
}

// Dashboard functionality
async function loadDashboard() {
    const userJson = localStorage.getItem('loggedInUser');
    if (!userJson) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userJson);
    document.getElementById('welcomeMsg').textContent = `Welcome, ${user.username}!`;

    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (response.ok) {
            const users = await response.json();
            const tbody = document.querySelector('#usersTable tbody');
            tbody.innerHTML = '';
            
            users.forEach(u => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${u.id}</td>
                    <td>${u.username}</td>
                    <td>${u.email}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (err) {
        console.error('Failed to fetch users', err);
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}
