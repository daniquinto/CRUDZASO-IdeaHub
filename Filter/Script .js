import { initializeSampleData } from './storageexample.js';
import { renderIdeas, populateAuthorFilter } from './ui_example.js';
import { initializeFilters } from './filter.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Ideas Feed...');
    console.log('Loading data...');
    
    initializeSampleData();
    
    populateAuthorFilter();
    
    renderIdeas();
    
    initializeFilters();
    
    addClearButton();
    console.log('Everything initialized correctly');
});

function addClearButton() {
    const filtersContainer = document.querySelector('.row.mb-4');
    if (filtersContainer) {
        const clearButton = document.createElement('div');
        clearButton.className = 'col-12 mt-2';
        clearButton.innerHTML = `
            <button id="clearFilters" class="btn btn-outline-secondary btn-sm">
                Clear filters
            </button>
        `;
        filtersContainer.appendChild(clearButton);
        
        document.getElementById('clearFilters').addEventListener('click', function() {
            document.getElementById('categoryFilter').value = '';
            document.getElementById('authorFilter').value = '';
            renderIdeas();
            const counter = document.getElementById('resultsCounter');
            if (counter) {
                counter.remove();
            }
        });
    }
}