import { getFromStorage, STORAGE_KEYS } from './storage.js';
import { renderIdeasFeed } from './ui.js';

// Wrapper function to render ideas with existing functionality
function renderIdeas(ideas = null) {
    const allIdeas = ideas || getFromStorage(STORAGE_KEYS.IDEAS) || [];
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const session = getFromStorage(STORAGE_KEYS.SESSION);
    
    renderIdeasFeed(allIdeas, users, session?.userId);
}

function filterIdeas() {
    console.log("Filtering ideas...");
    const catFilter = document.getElementById('categoryFilter').value;
    const autFilter = document.getElementById('authorFilter').value;
    const ideas = getFromStorage(STORAGE_KEYS.IDEAS) || [];
    
    console.log('Applied filters:', catFilter, autFilter);
    
    let result = [];
    
    for(let i = 0; i < ideas.length; i++) {
        let include = true;
        
        if (catFilter && ideas[i].category !== catFilter) {
            include = false;
        }
        
        if (autFilter && ideas[i].authorId !== parseInt(autFilter)) {
            include = false;
        }
        
        if (include) {
            result.push(ideas[i]);
        }
    }
    
    console.log('Results found:', result.length);
    renderIdeas(result);
    
    showCounter(result.length, ideas.length);
}

function showCounter(filtered, total) {
    let counter = document.getElementById('resultsCounter');
    
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'resultsCounter';
        counter.className = 'alert alert-info';
        const container = document.getElementById('ideasContainer');
        container.parentNode.insertBefore(counter, container);
    }
    
    counter.innerHTML = 'Found ' + filtered + ' of ' + total + ' ideas';
}

export function initializeFilters() {
    const catFilter = document.getElementById('categoryFilter');
    const autFilter = document.getElementById('authorFilter');
    
    catFilter.addEventListener('change', filterIdeas);
    autFilter.addEventListener('change', filterIdeas);
}

export function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('authorFilter').value = '';
    renderIdeas();
    
    const counter = document.getElementById('resultsCounter');
    if (counter) {
        counter.remove();
    }
}

 
export function searchIdeas() {
    const input = document.getElementById('search-input');
    const noResultsMessage = document.getElementById('no-results');
    
    if (!input || !noResultsMessage) {
        console.warn('Search elements not found');
        return;
    }
    
    const searchText = input.value.trim();
    
    if (searchText === '') {
        noResultsMessage.style.display = 'none';
        renderIdeas(); 
        return;
    }
    
    const ideas = getFromStorage(STORAGE_KEYS.IDEAS) || [];
    
    if (ideas.length === 0) {
        noResultsMessage.style.display = 'block';
        return;
    }
    
    // Search for matching ideas
    const foundIdeas = [];
    const searchQuery = searchText.toLowerCase();
    
    for (let i = 0; i < ideas.length; i++) {
        const idea = ideas[i];
        const title = idea.title ? idea.title.toLowerCase() : '';
        const description = idea.description ? idea.description.toLowerCase() : '';
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            foundIdeas.push(idea);
        }
    }
    
    if (foundIdeas.length === 0) {
        noResultsMessage.style.display = 'block';
        renderIdeas([]); 
        return;
    }
    
    noResultsMessage.style.display = 'none';
    renderIdeas(foundIdeas);
    showCounter(foundIdeas.length, ideas.length);
}

export function initializeSearch() {
    console.log('Initializing search...');
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        console.log('Search input found, adding event listener');
        searchInput.addEventListener('input', searchIdeas);
    } else {
        console.error('Search input not found!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeSearch();
});
