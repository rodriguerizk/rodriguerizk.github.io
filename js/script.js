// Hamburger Menu Toggle
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// Dark/Light Mode Toggle with persistence
const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.body.classList.add(currentTheme);
  toggleButton.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// Scroll Reveal
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
reveal();

// Active Navbar Link Highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links li a");

function setActiveLink() {
  let scrollPos = window.scrollY || document.documentElement.scrollTop;

  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links li a[href="#${id}"]`);

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink(); // run on page load



// Light Matrix Background for Whole Website
const canvasBg = document.getElementById('matrix-bg');
const ctxBg = canvasBg.getContext('2d');

canvasBg.width = window.innerWidth;
canvasBg.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 14; // smaller, subtle
const columns = Math.floor(canvasBg.width / fontSize);
const drops = Array(columns).fill(1);

function drawLightMatrix() {
  // Light semi-transparent background to create trailing effect
  ctxBg.fillStyle = 'rgba(249, 249, 249, 0.05)'; // matches light theme
  ctxBg.fillRect(0, 0, canvasBg.width, canvasBg.height);

  // Subtle colored letters
  ctxBg.fillStyle = 'rgba(31, 61, 122, 0.2)'; // soft blue to match theme
  ctxBg.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctxBg.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvasBg.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

let matrixBgInterval = setInterval(drawLightMatrix, 60);

// Adjust canvas on resize
window.addEventListener('resize', () => {
  canvasBg.width = window.innerWidth;
  canvasBg.height = window.innerHeight;
});


// accordion for research interests
document.querySelectorAll(".accordion").forEach(button => {
  button.addEventListener("click", () => {
    // Find the panel element after this button, skip non-panel siblings
    let panel = button.nextElementSibling;
    while (panel && !panel.classList.contains("panel")) {
      panel = panel.nextElementSibling;
    }
    if (!panel) return;

    const arrow = button.querySelector(".arrow");

    // Close other panels in the same card
    const card = button.closest(".card");
    card.querySelectorAll(".panel").forEach(p => {
      if (p !== panel) {
        p.style.maxHeight = null;
        p.classList.remove("open");
        const b = p.previousElementSibling;
        if (b && b.classList.contains("accordion")) {
          const a = b.querySelector(".arrow");
          if (a) a.style.transform = "rotate(0deg)";
        }
      }
    });

    // Toggle this panel
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.classList.remove("open");
      arrow.style.transform = "rotate(0deg)";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.classList.add("open");
      arrow.style.transform = "rotate(180deg)";
    }
  });
});


  // Disable browser scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // On page load
const profilePic = document.getElementById('profilePic');

  // Function to force light mode
  function setLightMode() {
    document.body.classList.remove('dark'); // remove dark mode
    document.body.classList.add('light');   // apply light mode
  localStorage.setItem('theme', 'light');
  toggleButton.textContent =  '🌙';
  }

  // Scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // On page load
  window.addEventListener('load', () => {
    window.scrollTo(0, 0); // scroll to top
    setLightMode();         // force light mode
  });

  // Click on profile pic to reload page
  profilePic.addEventListener('click', () => {
    // Keep relative path and query parameters
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = currentPath;
  });


