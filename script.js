/* eslint-disable no-unused-vars */
const menu = document.getElementById("nav");
const open = document.getElementById("menu-btn");
const close = document.getElementById("close");

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
  const nav = document.getElementById("navbar");
  const value = window.scrollY;

  if (value > 80) {
    nav.classList.add("nav-change");
  } else {
    nav.classList.remove("nav-change");
  }
}

window.addEventListener("scroll", change);

// function trivia
function getRandomTrivia() {
  const triviaContainer = document.getElementById("trivia-text");
  const triviaButton = document.getElementById("trivia-button");

  triviaContainer.textContent = "Loading trivia...";
  triviaButton.disabled = true;

  fetch("https://api.spoonacular.com/food/trivia/random?apiKey=49e13950a1f243ceacef5d4042116c27")
    .then((response) => response.json())
    .then((data) => {
      triviaContainer.textContent = data.text;
      triviaButton.disabled = false;
    })
    .catch((error) => {
      console.log("Error:", error);
      triviaContainer.textContent = "Failed to fetch trivia.";
      triviaButton.disabled = false;
    });
}

// function artikel
function toggleReadMore(id) {
  const para = document.getElementById(id);
  const button = document.querySelector(`#${id} + .toggle-button`);

  if (para.classList.contains("expanded")) {
    para.classList.remove("expanded");
    button.innerText = "Read More";
  } else {
    para.classList.add("expanded");
    button.innerText = "Read Less";
  }
}
