// Nav: solid background after scrolling past 60px
const nav = document.getElementById('nav');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Reservation form: swap to success panel on submit
const reserveForm = document.getElementById('reserve-form');
const reserveSuccess = document.getElementById('reserve-success');
const successName = document.getElementById('reserve-success-name');
const resetButton = document.getElementById('reserve-reset');

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  successName.textContent = document.getElementById('form-name').value.trim() || 'guest';
  reserveForm.hidden = true;
  reserveSuccess.hidden = false;
});

resetButton.addEventListener('click', () => {
  reserveSuccess.hidden = true;
  reserveForm.hidden = false;
});
