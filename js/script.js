/* ==========================================================
   Academic Website Script
   Author: Prof. [Your Name]
   Features:
   - Publications: sort by year, filter by topic, live search
   - Dark mode ready
========================================================== */

// ---------- DOM Elements ----------
const filterButtons = document.querySelectorAll('.filter-btn');
const pubList = document.querySelector('.pub-list');
const pubItems = Array.from(document.querySelectorAll('.pub-item'));
const searchInput = document.getElementById('pub-search');

// ---------- Publication Functions ----------

// Sort publications by year (descending)
function sortPublications(items) {
  items.sort((a, b) => {
    return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year'));
  });
}

// Update publications (filter + search + sort)
function updatePublications(filter, searchTerm = '') {
  let visibleItems;

  // Filter by category
  if (filter === 'all') {
    visibleItems = pubItems.slice();
  } else {
    visibleItems = pubItems.filter(item => item.classList.contains(filter));
  }

  // Filter by search term
  if (searchTerm) {
    visibleItems = visibleItems.filter(item =>
      item.textContent.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Hide all
  pubItems.forEach(item => item.style.display = 'none');

  // Sort visible ones by year descending
  sortPublications(visibleItems);

  // Show and append sorted
  visibleItems.forEach(item => {
    item.style.display = 'list-item';
    pubList.appendChild(item);
  });
}

// ---------- Event Listeners ----------

// Category filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    const searchTerm = searchInput.value;
    updatePublications(filter, searchTerm);
  });
});

// Live search
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const searchTerm = searchInput.value;
    updatePublications(activeFilter, searchTerm);
  });
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => updatePublications('all'));

// ---------- Optional: Dark Mode Toggle ----------
// Add a toggle button to your header if desired:
//
// <button id="dark-toggle" class="btn">Toggle Dark Mode</button>
//
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}
