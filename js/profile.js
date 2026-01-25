import { STORAGE_KEYS, getFromStorage, saveToStorage, initializeStorage } from './storage.js';
import { protectPage, getSession, logout } from './auth.js';
import { renderIdeasFeed } from './ui.js';

initializeStorage();

const PREFS_KEY = 'crudzaso_ideahub_profile_prefs';

const photoInput = document.getElementById("photoInput");
const bgInput = document.getElementById("bgInput");
const profilePhoto = document.getElementById("profilePhoto");
const banner = document.getElementById("banner");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const toggleBtn = document.getElementById("toggleIdeas");
const ideas = document.getElementById("ideas");

const totalIdeasEl = document.getElementById("totalIdeas");
const logoutBtn = document.getElementById("logoutBtn");

let currentUserId = null;

function getUsers() {
  return getFromStorage(STORAGE_KEYS.USERS) || [];
}
function getIdeas() {
  return getFromStorage(STORAGE_KEYS.IDEAS) || [];
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

/* ===== FOTO PERFIL ===== */
photoInput?.addEventListener("change", e => {
  const file = e.target.files?.[0];
  if (!file || !currentUserId) return;

  const reader = new FileReader();
  reader.onload = () => {
    profilePhoto.src = reader.result;
    setUserPref(currentUserId, { photo: reader.result });
  };
  reader.readAsDataURL(file);
});

/* ===== FOTO FONDO ===== */
bgInput?.addEventListener("change", e => {
  const file = e.target.files?.[0];
  if (!file || !currentUserId) return;

  const reader = new FileReader();
  reader.onload = () => {
    banner.style.backgroundImage = `url(${reader.result})`;
    setUserPref(currentUserId, { bg: reader.result });
  };
  reader.readAsDataURL(file);
});

/* ===== GUARDAR TEXTO ===== */
messageInput?.addEventListener("input", () => {
  if (!currentUserId) return;
  setUserPref(currentUserId, { message: messageInput.value });
});

/* ===== MOSTRAR / OCULTAR IDEAS ===== */
toggleBtn?.addEventListener("click", () => {
  if (!ideas) return;
  ideas.style.display = ideas.style.display === "none" ? "grid" : "none";
});

/* ===== CARGAR DATOS AL INICIAR ===== */
window.onload = () => {
  protectPage();

  const session = getSession();
  currentUserId = session?.userId;

  if (!currentUserId) {
    logout();
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.id === currentUserId);

  if (!user) {
    logout();
    return;
  }

  if (nameInput) {
    nameInput.value = user.name;
    nameInput.readOnly = true;
  }
  if (emailInput) {
    emailInput.value = user.email;
    emailInput.readOnly = true;
  }

  const prefs = getUserPref(currentUserId);
  if (prefs.photo) profilePhoto.src = prefs.photo;
  if (prefs.bg) banner.style.backgroundImage = `url(${prefs.bg})`;
  if (messageInput) messageInput.value = prefs.message || "";

  const allIdeas = getIdeas();
  const myIdeas = allIdeas.filter(i => i.authorId === currentUserId);

  if (totalIdeasEl) totalIdeasEl.textContent = String(myIdeas.length);

  renderIdeasFeed(myIdeas, users, currentUserId, 'ideasContainer');

  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
};
