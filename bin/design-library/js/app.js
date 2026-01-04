/**
 * Design Library - Main Application
 * Enhanced with robust copy, error handling, and accessibility
 */
import { library, getCategories, getComponentCount, findComponent, filterComponents } from './components/index.js';
import { getCategoryIcon } from './utils.js';

// ==========================================
// STATE MANAGEMENT
// ==========================================
let currentCategory = 'All';
let searchQuery = '';
let showFavoritesOnly = false;
let previewSize = 'normal'; // compact, normal, large
let favorites = JSON.parse(localStorage.getItem('designLibraryFavorites') || '[]');
let cardIndex = 0; // For staggered animations

// ==========================================
// DOM ELEMENTS
// ==========================================
const grid = document.getElementById('grid');
const navMenu = document.getElementById('nav-menu');
const pageTitle = document.getElementById('page-title');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const themeToggle = document.getElementById('theme-toggle');
const favoritesToggle = document.getElementById('favorites-toggle');
const sizeToggle = document.getElementById('size-toggle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const toastClose = document.getElementById('toast-close');
const scrollProgress = document.getElementById('scroll-progress');
const contentArea = document.getElementById('content-area');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const toastIcon = document.getElementById('toast-icon');

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================

/**
 * Show toast notification with type support
 * @param {string} message - Message to display
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 */
function showToast(message = 'Copied to clipboard!', type = 'success') {
  // Update toast content
  toastMessage.textContent = message;

  // Update toast type class
  toast.className = `toast toast-${type}`;

  // Update icon based on type
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  if (toastIcon) {
    toastIcon.textContent = icons[type] || icons.success;
  }

  // Reset progress animation
  const progressBar = toast.querySelector('.toast-progress-bar');
  if (progressBar) {
    progressBar.style.animation = 'none';
    progressBar.offsetHeight; // Trigger reflow
    progressBar.style.animation = 'toastProgress 2.5s linear forwards';
  }

  // Show toast
  toast.classList.add('visible');

  // Auto-hide after 2.5s
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

// Toast close button
if (toastClose) {
  toastClose.addEventListener('click', () => {
    toast.classList.remove('visible');
    clearTimeout(window.toastTimeout);
  });
}

// ==========================================
// CLIPBOARD FUNCTIONS (ROBUST)
// ==========================================

/**
 * Fallback copy using execCommand for older browsers
 */
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    document.body.removeChild(textarea);
    return false;
  }
}

/**
 * Show success state on button
 */
function showButtonSuccess(btn, originalHTML) {
  if (!btn) return;
  btn.disabled = false;
  btn.classList.add('btn-success-state');
  btn.innerHTML = `
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    Copied!
  `;

  setTimeout(() => {
    btn.classList.remove('btn-success-state');
    btn.innerHTML = originalHTML;
  }, 2000);
}

/**
 * Show error state on button
 */
function showButtonError(btn, originalHTML) {
  if (!btn) return;
  btn.disabled = false;
  btn.classList.add('btn-error-state');
  btn.innerHTML = `
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
    Failed
  `;

  setTimeout(() => {
    btn.classList.remove('btn-error-state');
    btn.innerHTML = originalHTML;
  }, 2000);
}

/**
 * Copy component code to clipboard with robust fallback
 */
window.copyCode = async function (id, event) {
  const item = findComponent(id);
  if (!item) {
    showToast('Component not found', 'error');
    return;
  }

  // Get the button for visual feedback
  const btn = event?.target?.closest('.btn-action') || event?.currentTarget;
  const originalHTML = btn?.innerHTML;

  // Show loading state
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <span class="spinner"></span>
      Copying...
    `;
  }

  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(item.code);
      showToast('Copied to clipboard!', 'success');
      showButtonSuccess(btn, originalHTML);
    } else {
      // Fallback for older browsers
      const success = fallbackCopy(item.code);
      if (success) {
        showToast('Copied to clipboard!', 'success');
        showButtonSuccess(btn, originalHTML);
      } else {
        throw new Error('Fallback copy failed');
      }
    }
  } catch (err) {
    console.error('Clipboard API failed:', err);

    // Try fallback method
    try {
      const success = fallbackCopy(item.code);
      if (success) {
        showToast('Copied to clipboard!', 'success');
        showButtonSuccess(btn, originalHTML);
      } else {
        throw new Error('All copy methods failed');
      }
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr);
      showToast('Copy failed. Please use Ctrl+C manually.', 'error');
      showButtonError(btn, originalHTML);
    }
  }
};

// ==========================================
// RENDER FUNCTIONS
// ==========================================

/**
 * Render the sidebar navigation
 */
function renderSidebar() {
  navMenu.innerHTML = '';

  const categories = getCategories();
  const groupDiv = document.createElement('div');
  groupDiv.className = 'category-group';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `nav-btn ${cat === currentCategory ? 'active' : ''}`;
    btn.setAttribute('aria-pressed', cat === currentCategory);

    const count = getComponentCount(cat);
    const icon = getCategoryIcon(cat);
    btn.innerHTML = `${icon} ${cat} <span class="nav-count">${count}</span>`;

    btn.onclick = () => filterCategory(cat, btn);
    groupDiv.appendChild(btn);
  });

  navMenu.appendChild(groupDiv);
}

/**
 * Render skeleton loading cards
 */
function renderSkeletons(count = 6) {
  grid.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'card skeleton';
    skeleton.setAttribute('aria-hidden', 'true');
    skeleton.innerHTML = `
      <div class="skeleton-preview"></div>
      <div class="skeleton-body">
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-desc"></div>
        <div class="skeleton-line skeleton-desc short"></div>
        <div class="skeleton-buttons">
          <div class="skeleton-btn"></div>
          <div class="skeleton-btn"></div>
        </div>
      </div>
    `;
    grid.appendChild(skeleton);
  }
}

/**
 * Render empty state
 */
function renderEmptyState() {
  grid.innerHTML = `
    <div class="empty-state" role="status">
      <svg class="empty-icon" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
      <h3 class="empty-title">${showFavoritesOnly ? 'No favorites yet' : 'No components found'}</h3>
      <p class="empty-desc">${showFavoritesOnly ? 'Click the heart icon on components to add them to favorites.' : 'Try adjusting your search terms or filters.'}</p>
      <div class="empty-actions">
        ${searchQuery ? `<button class="btn-action btn-secondary" onclick="window.clearSearch()">Clear Search</button>` : ''}
        <button class="btn-action btn-primary" onclick="window.showAll()">Show All Components</button>
      </div>
    </div>
  `;
}

/**
 * Highlight search matches in text
 */
function highlightMatches(text, query) {
  if (!query || query.length < 2) return text;
  try {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="highlight">$1</mark>');
  } catch (e) {
    return text;
  }
}

/**
 * Render the component grid
 */
function renderGrid() {
  cardIndex = 0;

  const filtered = filterComponents({
    category: currentCategory,
    searchQuery,
    favorites,
    showFavoritesOnly
  });

  if (filtered.length === 0) {
    renderEmptyState();
    return;
  }

  grid.innerHTML = '';

  filtered.forEach((item, index) => {
    const isFav = favorites.includes(item.id);
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.style.setProperty('--card-index', index);

    // Highlight search matches
    const displayTitle = highlightMatches(item.title, searchQuery);
    const displayDesc = highlightMatches(item.description, searchQuery);

    card.innerHTML = `
      <div class="card-preview">
        ${item.code}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${item.category}</span>
          <button class="fav-btn ${isFav ? 'active' : ''}" 
                  onclick="toggleFavorite('${item.id}')" 
                  aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
                  aria-pressed="${isFav}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <h3 class="card-title">${displayTitle}</h3>
        <p class="card-desc">${displayDesc}</p>
        <div class="card-footer">
          <button class="btn-action btn-primary" onclick="copyCode('${item.id}', event)" aria-label="Copy ${item.title} code">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy
          </button>
          <button class="btn-action btn-download" onclick="downloadCode('${item.id}')" aria-label="Download ${item.title} as HTML">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            .html
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  updateComponentCount();
}

/**
 * Update the component count display
 */
function updateComponentCount() {
  const filtered = filterComponents({
    category: currentCategory,
    searchQuery,
    favorites,
    showFavoritesOnly
  });
  document.getElementById('component-count').textContent = `${filtered.length} Components`;
}

// ==========================================
// ACTION HANDLERS
// ==========================================

/**
 * Filter by category
 */
function filterCategory(cat, btnElement) {
  currentCategory = cat;
  pageTitle.textContent = cat === 'All' ? 'All Components' : cat;

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btnElement.classList.add('active');
  btnElement.setAttribute('aria-pressed', 'true');

  // Close mobile menu after selection
  if (window.innerWidth < 768) {
    closeMobileMenu();
  }

  renderGrid();
}

/**
 * Clear search
 */
window.clearSearch = function () {
  searchInput.value = '';
  searchQuery = '';
  updateSearchClearVisibility();
  renderGrid();
};

/**
 * Show all components
 */
window.showAll = function () {
  currentCategory = 'All';
  searchQuery = '';
  showFavoritesOnly = false;
  searchInput.value = '';
  favoritesToggle.classList.remove('active');
  favoritesToggle.setAttribute('aria-pressed', 'false');
  pageTitle.textContent = 'All Components';

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  const allBtn = document.querySelector('.nav-btn');
  if (allBtn) {
    allBtn.classList.add('active');
    allBtn.setAttribute('aria-pressed', 'true');
  }

  updateSearchClearVisibility();
  renderGrid();
};

/**
 * Download component as HTML file
 */
window.downloadCode = function (id) {
  const item = findComponent(id);
  if (!item) {
    showToast('Component not found', 'error');
    return;
  }

  const blob = new Blob([item.code], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.id}.html`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded!', 'success');
};

/**
 * Toggle favorite status
 */
window.toggleFavorite = function (id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    showToast('Removed from favorites', 'info');
  } else {
    favorites.push(id);
    showToast('Added to favorites', 'success');
  }
  localStorage.setItem('designLibraryFavorites', JSON.stringify(favorites));
  renderGrid();
};

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

/**
 * Update search clear button visibility
 */
function updateSearchClearVisibility() {
  if (searchClear) {
    searchClear.style.opacity = searchInput.value ? '1' : '0';
    searchClear.style.pointerEvents = searchInput.value ? 'auto' : 'none';
  }
}

// Search input handler with debounce
let searchTimeout;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  updateSearchClearVisibility();

  searchTimeout = setTimeout(() => {
    searchQuery = e.target.value.trim();
    renderGrid();
  }, 150);
});

// Search clear button
if (searchClear) {
  searchClear.addEventListener('click', () => {
    window.clearSearch();
    searchInput.focus();
  });
}

// ==========================================
// SCROLL PROGRESS
// ==========================================

if (contentArea && scrollProgress) {
  contentArea.addEventListener('scroll', () => {
    const scrolled = contentArea.scrollTop;
    const max = contentArea.scrollHeight - contentArea.clientHeight;
    const percent = max > 0 ? (scrolled / max) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
  });
}

// ==========================================
// MOBILE MENU
// ==========================================

function closeMobileMenu() {
  sidebar.classList.remove('open');
  if (sidebarOverlay) sidebarOverlay.classList.remove('visible');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
}

function openMobileMenu() {
  sidebar.classList.add('open');
  if (sidebarOverlay) sidebarOverlay.classList.add('visible');
  mobileMenuToggle.setAttribute('aria-expanded', 'true');
}

if (mobileMenuToggle && sidebar) {
  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 &&
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      !mobileMenuToggle.contains(e.target) &&
      (!sidebarOverlay || !sidebarOverlay.contains(e.target))) {
      closeMobileMenu();
    }
  });
}

// ==========================================
// THEME TOGGLE
// ==========================================

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.setAttribute('aria-pressed', isDark);
  localStorage.setItem('designHubTheme', isDark ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('designHubTheme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.setAttribute('aria-pressed', 'true');
}

// ==========================================
// FAVORITES TOGGLE
// ==========================================

favoritesToggle.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  favoritesToggle.classList.toggle('active', showFavoritesOnly);
  favoritesToggle.setAttribute('aria-pressed', showFavoritesOnly);
  renderGrid();
});

// ==========================================
// PREVIEW SIZE TOGGLE
// ==========================================

sizeToggle.addEventListener('click', () => {
  if (previewSize === 'normal') previewSize = 'compact';
  else if (previewSize === 'compact') previewSize = 'large';
  else previewSize = 'normal';

  grid.classList.remove('compact', 'large');
  if (previewSize !== 'normal') grid.classList.add(previewSize);

  const sizeLabel = previewSize.charAt(0).toUpperCase() + previewSize.slice(1);
  sizeToggle.setAttribute('aria-label', `Toggle preview size: ${sizeLabel}`);
});

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
  // Ctrl+K or Cmd+K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }

  // Escape to clear search or close mobile menu
  if (e.key === 'Escape') {
    if (document.activeElement === searchInput) {
      searchInput.value = '';
      searchQuery = '';
      updateSearchClearVisibility();
      renderGrid();
      searchInput.blur();
    }
    if (sidebar.classList.contains('open')) {
      closeMobileMenu();
    }
  }
});

// Arrow key navigation through cards
document.addEventListener('keydown', (e) => {
  if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

  const cards = Array.from(document.querySelectorAll('.card:not(.skeleton)'));
  const focused = document.activeElement;

  if (!focused || !focused.classList.contains('card')) return;

  const currentIndex = cards.indexOf(focused);
  if (currentIndex === -1) return;

  // Calculate grid columns
  const gridStyles = window.getComputedStyle(grid);
  const cols = gridStyles.gridTemplateColumns.split(' ').length;

  let nextIndex;
  switch (e.key) {
    case 'ArrowRight': nextIndex = currentIndex + 1; break;
    case 'ArrowLeft': nextIndex = currentIndex - 1; break;
    case 'ArrowDown': nextIndex = currentIndex + cols; break;
    case 'ArrowUp': nextIndex = currentIndex - cols; break;
  }

  if (nextIndex >= 0 && nextIndex < cards.length) {
    e.preventDefault();
    cards[nextIndex].focus();
  }
});

// ==========================================
// INITIALIZATION
// ==========================================
console.log('Design Library Initializing...');
console.log('Library loaded:', library.length, 'components');
console.log('Categories:', getCategories());

try {
  // Show skeletons first
  renderSkeletons(6);

  // Initialize search clear visibility
  updateSearchClearVisibility();

  // Render after a brief delay for smooth loading effect
  setTimeout(() => {
    renderSidebar();
    console.log('Sidebar rendered');
    renderGrid();
    console.log('Grid rendered');
    updateComponentCount();
    console.log('Component count updated');
  }, 100);

} catch (error) {
  console.error('Initialization error:', error);
  showToast('Failed to load components', 'error');
}
