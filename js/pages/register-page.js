import { register } from '../auth.js';
import { showError, showSuccess, clearMessage } from '../ui.js';
import { initializeStorage } from '../storage.js';

// Initialize storage
initializeStorage();

const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Clear messages on input change
nameInput.addEventListener('input', () => {
    clearMessage('errorMessage');
    clearMessage('successMessage');
});
emailInput.addEventListener('input', () => {
    clearMessage('errorMessage');
    clearMessage('successMessage');
});
passwordInput.addEventListener('input', () => {
    clearMessage('errorMessage');
    clearMessage('successMessage');
});

// Handle register form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Basic validation
    if (!name || !email || !password) {
        showError('errorMessage', 'Todos los campos son obligatorios');
        return;
    }
    
    const result = register(name, email, password);
    
    if (result.success) {
        showSuccess('successMessage', result.message + '. Redirigiendo...');
        registerForm.reset();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showError('errorMessage', result.message);
    }
});