import { getUserById } from './auth.js';
import { getSession } from './auth.js';

// Show error message
export function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Show success message
export function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    }
}

// Clear message
export function clearMessage(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

// Render ideas to DOM
export function renderIdeas(ideas, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const session = getSession();
    
    if (ideas.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888; padding: 40px;">No hay ideas para mostrar</p>';
        return;
    }
    
    container.innerHTML = ideas.map(idea => {
        const author = getUserById(idea.authorId);
        const authorName = author ? author.name : 'Desconocido';
        const isOwner = session && session.userId === idea.authorId;
        
        return `
            <div class="idea-card">
                <h3>${escapeHtml(idea.title)}</h3>
                <p>${escapeHtml(idea.description)}</p>
                <div class="idea-meta">
                    <span class="category-badge category-${idea.category}">
                        ${getCategoryName(idea.category)}
                    </span>
                    <span class="author-name">Por: ${escapeHtml(authorName)}</span>
                </div>
                ${isOwner ? `
                    <div class="idea-actions">
                        <button class="btn btn-edit" onclick="window.editIdea('${idea.id}')">Editar</button>
                        <button class="btn btn-danger" onclick="window.deleteIdeaConfirm('${idea.id}')">Eliminar</button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        product: 'Producto',
        improvement: 'Mejora',
        experiment: 'Experimento',
        other: 'Otro'
    };
    return categories[category] || category;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Populate author filter
export function populateAuthorFilter(ideas) {
    const authorFilter = document.getElementById('authorFilter');
    if (!authorFilter) return;
    
    const uniqueAuthors = [...new Set(ideas.map(idea => idea.authorId))];
    
    authorFilter.innerHTML = '<option value="">Todos</option>';
    
    uniqueAuthors.forEach(authorId => {
        const author = getUserById(authorId);
        if (author) {
            const option = document.createElement('option');
            option.value = authorId;
            option.textContent = author.name;
            authorFilter.appendChild(option);
        }
    });
}

// Show modal
export function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hide modal
export function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}