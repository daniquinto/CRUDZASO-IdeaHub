const photoInput = document.getElementById("photoInput");
const bgInput = document.getElementById("bgInput");
const profilePhoto = document.getElementById("profilePhoto");
const banner = document.getElementById("banner");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const toggleBtn = document.getElementById("toggleIdeas");
const ideas = document.getElementById("ideas");

/* ===== FOTO PERFIL ===== */
photoInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    profilePhoto.src = reader.result;
    localStorage.setItem("photo", reader.result);
  };
  reader.readAsDataURL(file);
});

/* ===== FOTO FONDO ===== */
bgInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    banner.style.backgroundImage = `url(${reader.result})`;
    localStorage.setItem("bg", reader.result);
  };
  reader.readAsDataURL(file);
});

/* ===== GUARDAR TEXTO ===== */
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", () => {
    localStorage.setItem(input.id, input.value);
  });
});

/* ===== MOSTRAR / OCULTAR IDEAS ===== */
toggleBtn.addEventListener("click", () => {
  ideas.style.display = ideas.style.display === "none" ? "grid" : "none";
});

/* ===== CARGAR DATOS AL INICIAR ===== */
window.onload = () => {
  const photo = localStorage.getItem("photo");
  const bg = localStorage.getItem("bg");

  if (photo) profilePhoto.src = photo;
  if (bg) banner.style.backgroundImage = `url(${bg})`;

  nameInput.value = localStorage.getItem("name") || "";
  emailInput.value = localStorage.getItem("email") || "";
  messageInput.value = localStorage.getItem("message") || "";
};
