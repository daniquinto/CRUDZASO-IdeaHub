import { login } from '../auth.js';
import { showError, clearMessage } from '../ui.js';
import { initializeStorage } from '../storage.js';

// Initialize storage
initializeStorage();

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Clear error on input change
emailInput.addEventListener('input', () => clearMessage('errorMessage'));
passwordInput.addEventListener('input', () => clearMessage('errorMessage'));

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    const result = login(email, password);
    
    if (result.success) {
        window.location.href = 'ideas.html';
    } else {
        showError('errorMessage', result.message);
    }
});