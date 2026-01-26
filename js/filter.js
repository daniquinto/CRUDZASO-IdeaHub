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


// Buscador 
function buscar() {
    const input = document.getElementById('search-input');
    const lista = document.getElementById('results');
    const mensaje = document.getElementById('no-results');
    
    if (!input || !lista || !mensaje) return;
    
    const texto = input.value;
    lista.innerHTML = '';
    
    if (texto === '') {
        mensaje.style.display = 'none';
        return;
    }
    
    let ideas = [];
    let usuarios = [];
    
    try {
        const ideasStr = localStorage.getItem('crudzaso_ideahub_ideas');
        const usuariosStr = localStorage.getItem('crudzaso_ideahub_users');
        
        if (ideasStr) ideas = JSON.parse(ideasStr);
        if (usuariosStr) usuarios = JSON.parse(usuariosStr);
    } catch (e) {
        mensaje.style.display = 'block';
        return;
    }
    
    if (!ideas || ideas.length === 0) {
        mensaje.style.display = 'block';
        return;
    }
    
    // buscar
    let encontradas = [];
    for (let i = 0; i < ideas.length; i++) {
        const idea = ideas[i];
        const titulo = idea.title.toLowerCase();
        const desc = idea.description.toLowerCase();
        const busqueda = texto.toLowerCase();
        
        if (titulo.includes(busqueda) || desc.includes(busqueda)) {
        encontradas.push(idea);
        }
    }
    
    if (encontradas.length === 0) {
        mensaje.style.display = 'block';
        return;
    }
    
    mensaje.style.display = 'none';
    
    for (let i = 0; i < encontradas.length; i++) {
        const idea = encontradas[i];
        
        let autor = 'Desconocido';
        for (let j = 0; j < usuarios.length; j++) {
        if (usuarios[j].id === idea.authorId) {
            autor = usuarios[j].name;
            break;
        }
        }
        
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = idea.title + ' - ' + autor;
        lista.appendChild(li);
    }
}
