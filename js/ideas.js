
import { STORAGE_KEYS, getFromStorage, saveToStorage, initializeStorage } from './storage.js';
import { protectPage, getSession, logout } from './auth.js';

initializeStorage();


function getUsers() {
  return getFromStorage(STORAGE_KEYS.USERS) || [];
}
function getIdeas() {
  return getFromStorage(STORAGE_KEYS.IDEAS) || [];
}
function setIdeas(ideas) {
  saveToStorage(STORAGE_KEYS.IDEAS, ideas);
}
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}


function createCard(idea, author, userId) {
  let buttons = '';
  if (idea.authorId === userId) {
    buttons = '<button class="btn btn-outline-primary btn-sm me-2">Edit</button><button class="btn btn-outline-danger btn-sm">Delete</button>';
  }
  // Sistem about likes
  const likes = idea.likes || [];
  const likesCount = likes.length;
  const userLiked = likes.includes(userId);
  const likeClass = userLiked ? 'btn-danger' : 'btn-outline-danger';
  const likeIcon = userLiked ? '❤️' : '🤍';

  let date = new Date(idea.createdAt);
  let dateText = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  let authorText = author ? author.name : 'Unknown user';
  return '<div class="col-md-6 col-lg-4 mb-4"><div class="card h-100 shadow-sm"><div class="card-header d-flex justify-content-between align-items-center"><span class="badge bg-primary">' + idea.category + '</span><small class="text-muted">' + dateText + '</small></div><div class="card-body"><h5 class="card-title">' + idea.title + '</h5><p class="card-text">' + idea.description + '</p></div><div class="card-footer bg-transparent"><div class="d-flex justify-content-between align-items-center mb-2"><div class="d-flex align-items-center gap-2"><small class="text-muted">By: ' + authorText + '</small><button class="btn ' + likeClass + ' btn-sm" data-action="like" data-id="' + idea.id + '">' + likeIcon + ' ' + likesCount + '</button></div><div class="btn-group">' + buttons + '</div></div></div></div></div>';
}
function toggleLike(ideaId, userId) {
  const ideas = getIdeas();
  const idea = ideas.find(i => i.id === ideaId);
  if (!idea) return;

  // Start likes if they don't exist
  if (!idea.likes) idea.likes = [];

  const userIndex = idea.likes.indexOf(userId);

  if (userIndex === -1) {
    // Add like
    idea.likes.push(userId);
  } else {
    // Remove like
    idea.likes.splice(userIndex, 1);
  }

  setIdeas(ideas);
}


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
  for (let i = 0; i < allIdeas.length; i++) {
    const idea = allIdeas[i];
    let author = null;
    for (let j = 0; j < users.length; j++) {
      if (users[j].id === idea.authorId) {
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

  for (let i = 0; i < users.length; i++) {
    const option = document.createElement('option');
    option.value = users[i].id;
    option.textContent = users[i].name;
    authorFilter.appendChild(option);
  }
}

function renderIdeasFeed(ideas, users, currentUserId) {
  const container = document.getElementById('ideasContainer');
  if (!container) return;

  if (!ideas || ideas.length === 0) {
    container.innerHTML =
      `<div class="col-12 text-center">
        <div class="alert alert-info">
          <h5>No ideas found</h5>
          <p>Be the first to share!</p>
        </div>
      </div>`;
    return;
  }

  let html = '';
  for (let i = 0; i < ideas.length; i++) {
    const idea = ideas[i];

    let author = null;
    for (let j = 0; j < users.length; j++) {
      if (users[j].id === idea.authorId) {
        author = users[j];
        break;
      }
    }

    html += createCard(idea, author, currentUserId);
  }

  container.innerHTML = html;
}

/* ---------- CRUD ---------- */
function createIdea({ title, description, category, authorId }) {
  const ideas = getIdeas();
  const newIdea = {
    id: generateId(),
    title,
    description,
    category,
    authorId,
    likes: [],
    createdAt: new Date().toISOString(),
  };
  ideas.unshift(newIdea);
  setIdeas(ideas);
}

function updateIdea(id, updates, currentUserId) {
  const ideas = getIdeas();
  const idx = ideas.findIndex(i => i.id === id);
  if (idx === -1) return;
  if (ideas[idx].authorId !== currentUserId) return;

  ideas[idx] = { ...ideas[idx], ...updates };
  setIdeas(ideas);
}

function deleteIdea(id, currentUserId) {
  const ideas = getIdeas();
  const idea = ideas.find(i => i.id === id);
  if (!idea) return;
  if (idea.authorId !== currentUserId) return;

  setIdeas(ideas.filter(i => i.id !== id));
}

/* ---------- refresh and filters  ---------- */
function applyFilters(allIdeas) {
  const cat = document.getElementById('categoryFilter')?.value || '';
  const author = document.getElementById('authorFilter')?.value || '';

  return allIdeas.filter(i => {
    const okCat = !cat || i.category === cat;
    const okAuthor = !author || i.authorId === author;
    return okCat && okAuthor;
  });
}

function refreshUI() {
  const session = getSession();
  const users = getUsers();
  const ideas = getIdeas();
  const filtered = applyFilters(ideas);

  renderIdeasFeed(filtered, users, session.userId);

  const counter = document.getElementById('resultsCounter');
  if (counter) counter.textContent = `${filtered.length} results`;
}

/* ---------- Wiring ---------- */
document.addEventListener('DOMContentLoaded', () => {
  protectPage();

  const session = getSession();
  const users = getUsers();

  populateAuthorFilter(users);

  document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });


  document.getElementById('ideaForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('ideaTitle')?.value.trim();
    const description = document.getElementById('ideaDescription')?.value.trim();
    const category = document.getElementById('ideaCategory')?.value;

    if (!title || !description || !category) return;

    createIdea({ title, description, category, authorId: session.userId });
    e.target.reset();
    refreshUI();
  });


  document.getElementById('categoryFilter')?.addEventListener('change', refreshUI);
  document.getElementById('authorFilter')?.addEventListener('change', refreshUI);


  document.getElementById('ideasContainer')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'delete') {
      deleteIdea(id, session.userId);
      refreshUI();
      return;
    }

    if (action === 'edit') {
      const ideas = getIdeas();
      const idea = ideas.find(i => i.id === id);
      if (!idea) return;

      const newTitle = prompt('New title:', idea.title);
      if (newTitle === null) return;

      const newDesc = prompt('New description:', idea.description);
      if (newDesc === null) return;

      updateIdea(id, { title: newTitle.trim(), description: newDesc.trim() }, session.userId);
      refreshUI();
    }
    //handle likes
    if (action === 'like') {
      toggleLike(id, session.userId);
      refreshUI();
    }

  });

  refreshUI();
});

addClearButton(refreshUI);

function addClearButton(refreshUIFn) {
  const filtersContainer = document.querySelector('.row.mb-4');
  if (!filtersContainer) return;


  if (document.getElementById('clearFilters')) return;

  const clearButton = document.createElement('div');
  clearButton.className = 'col-12 mt-2';
  clearButton.innerHTML = `
    <button id="clearFilters" class="btn btn-outline-secondary btn-sm">
      Clear filters
    </button>
  `;
  filtersContainer.appendChild(clearButton);

  document.getElementById('clearFilters').addEventListener('click', () => {
    const cat = document.getElementById('categoryFilter');
    const author = document.getElementById('authorFilter');

    if (cat) cat.value = '';
    if (author) author.value = '';

    refreshUIFn();
  });
}