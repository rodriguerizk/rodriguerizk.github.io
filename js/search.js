let posts = [];

fetch('/search.json')
  .then(res => res.json())
  .then(data => posts = data);

function searchPosts() {
  const q = document.getElementById('searchBar').value.toLowerCase();
  const cards = document.querySelectorAll('.blog-card');

  cards.forEach(card => {
    const title = card.querySelector('h2').innerText.toLowerCase();
    card.style.display = title.includes(q) ? 'block' : 'none';
  });
}
