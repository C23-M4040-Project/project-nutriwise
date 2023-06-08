/* eslint-disable no-unused-vars */
const menu = document.getElementById('nav');
const open = document.getElementById('menu-btn');
const close = document.getElementById('close');

function openmenu() {
  menu.style.left = '0';
  open.style.display = 'none';
  close.style.display = 'block';
}

function closemenu() {
  menu.style.left = '-100%';
  open.style.display = 'block';
  close.style.display = 'none';
}

// nav background color change

function change() {
  const nav = document.getElementById('navbar');
  const value = window.scrollY;

  if (value > 80) {
    nav.classList.add('nav-change');
  } else {
    nav.classList.remove('nav-change');
  }
}

window.addEventListener('scroll', change);
