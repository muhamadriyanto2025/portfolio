// hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

 hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');

});

// navbar fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }               
};

// dark mode toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const iconDark = document.getElementById('icon-dark');
  const iconLight = document.getElementById('icon-light');

  if (!toggle) return; // biar ga error

  // load awal
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    iconDark.classList.add('hidden');
    iconLight.classList.remove('hidden');
  }

  toggle.addEventListener('click', () => {
    console.log('klik detected'); // debug

    html.classList.toggle('dark');

    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      iconDark.classList.add('hidden');
      iconLight.classList.remove('hidden');
    } else {
      localStorage.setItem('theme', 'light');
      iconDark.classList.remove('hidden');
      iconLight.classList.add('hidden');
    }
  });
});
