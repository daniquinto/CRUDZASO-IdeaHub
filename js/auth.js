import { getFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from './storage.js';

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Register new user
export function register(name, email, password) {
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'The email was already registered' };
    }
    
    // Validate password length
    if (password.length < 6) {
        return { success: false, message: 'The password must have 6 characters' };
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name,
        email,
        password, // In production, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, users);
    
    return { success: true, message: 'User register correctly', user: newUser };
}

// Login user
export function login(email, password) {
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { success: false, message: 'wrong email or password' };
    }
    
    // Create session
    const session = {
        userId: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
    };
    
    saveToStorage(STORAGE_KEYS.SESSION, session);
    
    return { success: true, message: 'Login successful', user };
}

// Get current session
export function getSession() {
    return getFromStorage(STORAGE_KEYS.SESSION);
}

// Check if user is logged in
export function isLoggedIn() {
    return getSession() !== null;
}

// Logout user
export function logout() {
    removeFromStorage(STORAGE_KEYS.SESSION);
    window.location.href = './index.html';
}

// Protect page (redirect if not logged in)
export function protectPage() {
    if (!isLoggedIn()) {
        window.location.href = './index.html';
    }
}

// Get user by ID
export function getUserById(userId) {
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    return users.find(user => user.id === userId);
}