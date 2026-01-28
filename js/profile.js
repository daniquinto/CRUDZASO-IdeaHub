import { STORAGE_KEYS, getFromStorage, saveToStorage, initializeStorage } from './storage.js';
import { protectPage, getSession, logout } from './auth.js';
import './ui.js'; // Importar funciones de UI incluyendo modo oscuro

initializeStorage();


const PREFS_KEY = 'crudzaso_ideahub_profile_prefs';

const photoInput = document.getElementById("photoInput");
const bgInput = document.getElementById("bgInput");
const profilePhoto = document.getElementById("profilePhoto");
const banner = document.getElementById("banner");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const toggleIdeasBtn = document.getElementById("toggleIdeas");
const ideas = document.getElementById("ideasContainer");

const totalIdeasEl = document.getElementById("totalIdeas");
const logoutBtn = document.getElementById("logoutBtn");


export function clearMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.classList.add('d-none');
    }
}

function getPrefs() {
  return getFromStorage(PREFS_KEY) || {};
}
function setPrefs(prefs) {
  saveToStorage(PREFS_KEY, prefs);
}
function setUserPref(userId, updates) {
  const prefs = getPrefs();
  prefs[userId] = { ...(prefs[userId] || {}), ...updates };
  setPrefs(prefs);
}
function getUserPref(userId) {
  const prefs = getPrefs();
  return prefs[userId] || {};
}

function getUsers() {
  return getFromStorage(STORAGE_KEYS.USERS) || [];
}
function getIdeas() {
  return getFromStorage(STORAGE_KEYS.IDEAS) || [];
}

function createCard(idea, author, userId) {
  let buttons = '';
  if (String(idea.authorId) === String(userId)) {
    buttons =
      `<button class="btn btn-outline-primary btn-sm me-2" data-action="edit" data-id="${idea.id}">Edit</button>` +
      `<button class="btn btn-outline-danger btn-sm" data-action="delete" data-id="${idea.id}">Delete</button>`;
  }

  let date = new Date(idea.createdAt);
  let dateText = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  let authorText = author ? author.name : 'Unknown user';

  return '<div class="col-md-6 col-lg-4 mb-4">' +
    '<div class="card h-100 shadow-sm">' +
      '<div class="card-header d-flex justify-content-between align-items-center">' +
        '<span class="badge bg-primary">' + idea.category + '</span>' +
        '<small class="text-muted">' + dateText + '</small>' +
      '</div>' +
      '<div class="card-body">' +
        '<h5 class="card-title">' + idea.title + '</h5>' +
        '<p class="card-text">' + idea.description + '</p>' +
      '</div>' +
      '<div class="card-footer bg-transparent">' +
        '<div class="d-flex justify-content-between align-items-center">' +
          '<small class="text-muted">By: ' + authorText + '</small>' +
          '<div class="btn-group">' + buttons + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function renderMyIdeas(userId) {
  if (!ideas) return;

  const allIdeas = getIdeas();
  const users = getUsers();

  const myIdeas = allIdeas.filter(i => String(i.authorId) === String(userId));

  if (totalIdeasEl) totalIdeasEl.textContent = String(myIdeas.length);

  if (myIdeas.length === 0) {
    ideas.innerHTML =
      '<div class="col-12 text-center">' +
        '<div class="alert alert-info">' +
          '<h5>No ideas found</h5><p>Be the first to share!</p>' +
        '</div>' +
      '</div>';
    return;
  }

  let html = '';
  for (let i = 0; i < myIdeas.length; i++) {
    const idea = myIdeas[i];

    let author = null;
    for (let j = 0; j < users.length; j++) {
      if (String(users[j].id) === String(idea.authorId)) {
        author = users[j];
        break;
      }
    }

    html += createCard(idea, author, userId);
  }

  ideas.innerHTML = html;
}

function updateIdea(id, updates, currentUserId) {
  const allIdeas = getIdeas();
  const idx = allIdeas.findIndex(i => i.id === id);
  if (idx === -1) return;
  if (String(allIdeas[idx].authorId) !== String(currentUserId)) return;

  allIdeas[idx] = { ...allIdeas[idx], ...updates };
  saveToStorage(STORAGE_KEYS.IDEAS, allIdeas);
}

function deleteIdea(id, currentUserId) {
  const allIdeas = getIdeas();
  const idea = allIdeas.find(i => i.id === id);
  if (!idea) return;
  if (String(idea.authorId) !== String(currentUserId)) return;

  saveToStorage(STORAGE_KEYS.IDEAS, allIdeas.filter(i => i.id !== id));
}

/* ===== FOTO PERFIL ===== */
photoInput?.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const session = getSession();
  const userId = session?.userId ?? session?.id;
  if (!userId) return;

  const reader = new FileReader();
  reader.onload = () => {
    profilePhoto.src = reader.result;
    setUserPref(userId, { photo: reader.result });
  };
  reader.readAsDataURL(file);
})
/* ===== GUARDAR TEXTO ===== */
messageInput?.addEventListener("input", () => {
  const session = getSession();
  const userId = session?.userId ?? session?.id;
  if (!userId) return;

  setUserPref(userId, { message: messageInput.value });
});

/* ===== MOSTRAR / OCULTAR IDEAS ===== */
toggleIdeasBtn?.addEventListener("click", () => {
  if (!ideas) return;
  ideas.style.display = ideas.style.display === "none" ? "flex" : "none";
});

/* ===== CARGAR DATOS AL INICIAR ===== */
window.onload = () => {
  protectPage();
  initTheme();

  const session = getFromStorage(STORAGE_KEYS.SESSION) || getFromStorage('crudzaso_ideahub_session');
  const userId = session?.userId ?? session?.id;

  if (!userId) {
    logout();
    return;
  }

  const users = getUsers();
  const user = users.find(u => String(u.id) === String(userId));

  if (!user) {
    logout();
    return;
  }

  if (nameInput) { nameInput.value = user.name; nameInput.readOnly = true; }
  if (emailInput) { emailInput.value = user.email; emailInput.readOnly = true; }

  const prefs = getUserPref(userId);
  if (prefs.photo) profilePhoto.src = prefs.photo;
  if (prefs.bg) banner.style.backgroundImage = `url(${prefs.bg})`;
  if (messageInput) messageInput.value = prefs.message || "";

  renderMyIdeas(userId);

  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });

  ideas?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'delete') {
      deleteIdea(id, userId);
      renderMyIdeas(userId);
      return;
    }

    if (action === 'edit') {
      const allIdeas = getIdeas();
      const idea = allIdeas.find(i => i.id === id);
      if (!idea) return;

      const newTitle = prompt('New title:', idea.title);
      if (newTitle === null) return;

      const newDesc = prompt('New description:', idea.description);
      if (newDesc === null) return;

      updateIdea(id, { title: newTitle.trim(), description: newDesc.trim() }, userId);
      renderMyIdeas(userId);
    }
  });
};
