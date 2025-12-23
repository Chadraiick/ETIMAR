// Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-arrow.left');
const nextBtn = document.querySelector('.slider-arrow.right');
const dotsContainer = document.getElementById('slider-dots');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  updateDots(index);
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  let prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

function createDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function updateDots(index) {
  const dots = dotsContainer.querySelectorAll('button');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Init slider
if (slides.length > 0) {
  createDots();
  showSlide(0);
  startAutoSlide();
  nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
  prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
  document.getElementById('slider').addEventListener('mouseenter', stopAutoSlide);
  document.getElementById('slider').addEventListener('mouseleave', startAutoSlide);
}

// Menu burger mobile
const menuToggle = document.getElementById('menu-toggle');
const navOverlay = document.getElementById('nav-overlay');
let navOpen = false;

menuToggle.addEventListener('click', () => {
  navOpen = !navOpen;
  navOverlay.classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
});
navOverlay.addEventListener('click', (e) => {
  if (e.target === navOverlay) {
    navOpen = false;
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});
// Fermer le menu au clic sur un lien
navOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navOpen = false;
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
}); 