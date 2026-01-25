import { getFromStorage } from '../Filter/storageexample.js';
import { renderIdeas } from '../Filter/ui_example.js';

function filterIdeas() {
    console.log("Filtering ideas...");
    const catFilter = document.getElementById('categoryFilter').value;
    const autFilter = document.getElementById('authorFilter').value;
    const ideas = getFromStorage('crudzaso_ideahub_ideas');
    
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