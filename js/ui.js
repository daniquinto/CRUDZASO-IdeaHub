// Show error message
export function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('d-none');
    }
}

// Show success message
export function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.classList.remove('d-none');
    }
}

// Clear message
export function clearMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.classList.add('d-none');
    }
}

export function populateAuthorFilter(users, selectEl) {
  if (!selectEl) return;
  selectEl.innerHTML = `<option value="">All authors</option>` + users
    .map(u => `<option value="${u.id}">${u.name}</option>`)
    .join('');
}

export function renderIdeasFeed(ideas, users, currentUserId) {
  const container = document.getElementById('ideasContainer');
  if (!container) return;

  const userById = new Map(users.map(u => [u.id, u]));

  container.innerHTML = ideas.map(idea => {
    const authorName = userById.get(idea.authorId)?.name || 'Unknown';
    const isAuthor = idea.authorId === currentUserId;

    return `
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h5 class="card-title">${idea.title}</h5>
                <p class="card-text">${idea.description}</p>
                <span class="badge text-bg-secondary">${idea.category}</span>
                <small class="ms-2 text-muted">by ${authorName}</small>
              </div>

              ${isAuthor ? `
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-outline-primary" data-action="edit" data-id="${idea.id}">Edit</button>
                  <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${idea.id}">Delete</button>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
