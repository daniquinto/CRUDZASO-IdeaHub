import { getFromStorage } from './storageexample.js';

function createCard(idea, author, userId) {
    let buttons = '';
    if (idea.authorId === userId) {
        buttons = '<button class="btn btn-outline-primary btn-sm me-2">Edit</button><button class="btn btn-outline-danger btn-sm">Delete</button>';
    }
    
    let date = new Date(idea.createdAt);
    let dateText = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    
    let authorText = author ? author.name : 'Unknown user';
    
    return '<div class="col-md-6 col-lg-4 mb-4"><div class="card h-100 shadow-sm"><div class="card-header d-flex justify-content-between align-items-center"><span class="badge bg-primary">' + idea.category + '</span><small class="text-muted">' + dateText + '</small></div><div class="card-body"><h5 class="card-title">' + idea.title + '</h5><p class="card-text">' + idea.description + '</p></div><div class="card-footer bg-transparent"><div class="d-flex justify-content-between align-items-center"><small class="text-muted">By: ' + authorText + '</small><div class="btn-group">' + buttons + '</div></div></div></div></div>';
}

export function renderIdeas(ideasFiltradas = null) {
export function renderIdeas(filteredIdeas = null) {
    console.log("Rendering ideas...");
    const container = document.getElementById('ideasContainer');
    const allIdeas = filteredIdeas || getFromStorage('crudzaso_ideahub_ideas');
    const users = getFromStorage('crudzaso_ideahub_users');
    const session = getFromStorage('crudzaso_ideahub_session');
    const currentUser = session ? session.userId : null;
    
    console.log('Total ideas to show:', allIdeas.length);
    
    if (allIdeas.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><div class="alert alert-info"><h5>No ideas found</h5><p>Be the first to share!</p></div></div>';
        return;
    }
    
    let html = '';
    for(let i = 0; i < allIdeas.length; i++) {
        const idea = allIdeas[i];
        let author = null;
        for(let j = 0; j < users.length; j++) {
            if(users[j].id === idea.authorId) {
                author = users[j];
                break;
            }
        }
        html += createCard(idea, author, currentUser);
    }
    
    container.innerHTML = html;
    console.log('Ideas rendered correctly');
}

export function populateAuthorFilter() {
    const authorFilter = document.getElementById('authorFilter');
    const users = getFromStorage('crudzaso_ideahub_users');
    
    authorFilter.innerHTML = '<option value="">All authors</option>';
    
    for(let i = 0; i < users.length; i++) {
        const option = document.createElement('option');
        option.value = users[i].id;
        option.textContent = users[i].name;
        authorFilter.appendChild(option);
    }
}