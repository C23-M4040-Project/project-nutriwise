let menu = document.getElementById("nav");
let open = document.getElementById("menu-btn");
let close = document.getElementById("close");

function openmenu() {
  menu.style.left = "0";
  open.style.display = "none";
  close.style.display = "block";
}

function closemenu() {
  menu.style.left = "-100%";
  open.style.display = "block";
  close.style.display = "none";
}

function handleResize() {
  if (window.innerWidth >= 768) {
    menu.style.left = "0";
    open.style.display = "none";
    close.style.display = "none";
  } else {
    menu.style.left = "-100%";
    open.style.display = "block";
    close.style.display = "none";
  }
}

window.addEventListener("resize", handleResize);

// nav background color change

function change() {
  var nav = document.getElementById("navbar");
  var value = window.scrollY;

  if (value > 80) {
    nav.classList.add("nav-change");
  } else {
    nav.classList.remove("nav-change");
  }
}

window.addEventListener("scroll", change);
