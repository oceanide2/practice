let currentMenu = document.querySelector('.is_active');
const headerMenu = document.querySelector('.header-menu');

function clickMenuHandler(e) {
  if (e.target === this) return;

  if (currentMenu) {
    currentMenu.classList.remove('is_active');
  }
  e.target.classList.add('is_active');
  currentMenu = e.target;
}

function init() {
  headerMenu.addEventListener('click', clickMenuHandler);
}

init();
