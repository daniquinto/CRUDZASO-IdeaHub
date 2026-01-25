// Storage keys
export const STORAGE_KEYS = {
    USERS: 'crudzaso_ideahub_users',
    IDEAS: 'crudzaso_ideahub_ideas',
    SESSION: 'crudzaso_ideahub_session'
};

// Get data from localStorage
export function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from storage:', error);
        return null;
    }
}

// Save data to localStorage
export function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to storage:', error);
        return false;
    }
}

// Remove data from localStorage
export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from storage:', error);
        return false;
    }
}

// Initialize storage with empty arrays if not exists
export function initializeStorage() {
    if (!getFromStorage(STORAGE_KEYS.USERS)) {
        saveToStorage(STORAGE_KEYS.USERS, []);
    }
    if (!getFromStorage(STORAGE_KEYS.IDEAS)) {
        saveToStorage(STORAGE_KEYS.IDEAS, []);
    }
}