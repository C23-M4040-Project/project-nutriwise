/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
// API endpoint and key
const API_ENDPOINT = 'https://api.spoonacular.com/recipes';
const API_KEY = '0ddfb4e413cb4bce9818e436936ed113';

// DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipeList = document.getElementById('recipe-list');
const recommendationList = document.getElementById('recommendation-list');

// Event listener for form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value;
  searchRecipes(query);
  searchInput.value = '';
});

// Search recipes
async function searchRecipes(query) {
  recipeList.innerHTML = '';
  const response = await fetch(`${API_ENDPOINT}/complexSearch?apiKey=${API_KEY}&query=${query}`);
  const data = await response.json();
  displayRecipes(data.results);
}

// Display recipe cards
function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    recipeList.appendChild(recipeCard);
  });
}

// Create recipe card
// function createRecipeCard(recipe) {
//   const recipeCard = document.createElement('div');
//   recipeCard.className = 'recipe-card';

//   const image = document.createElement('img');
//   image.src = recipe.image;
//   recipeCard.appendChild(image);

//   const title = document.createElement('h3');
//   title.textContent = recipe.title;
//   recipeCard.appendChild(title);

//   const link = document.createElement('a');
//   link.textContent = 'View Recipe';
//   link.href = recipe.id;
//   recipeCard.appendChild(link);

//   recipeCard.addEventListener('click', () => {
//     getRecipeInformation(recipe.id);
//   });

//   return recipeCard;
// }

function createRecipeCard(recipe) {
  const recipeCard = document.createElement('div');
  recipeCard.className = 'recipe-card';

  const recipeCardHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
    <a href="#recipe-info">View Recipe</a>
  `;

  recipeCard.insertAdjacentHTML('beforeend', recipeCardHTML);

  recipeCard.addEventListener('click', () => {
    getRecipeInformation(recipe.id);
  });

  return recipeCard;
}

// Get recipe information
async function getRecipeInformation(recipeId) {
  const response = await fetch(`${API_ENDPOINT}/${recipeId}/information?apiKey=${API_KEY}`);
  getRecommendations(recipeId);
}

// Get recipe recommendations
async function getRecommendations(recipeId) {
  recommendationList.innerHTML = '';
  const response = await fetch(`${API_ENDPOINT}/${recipeId}/similar?apiKey=${API_KEY}`);
  const data = await response.json();
  displayRecommendations(data);
}

// Display recipe recommendations
function displayRecommendations(recommendations) {
  recommendationList.innerHTML = '';
  recommendations.forEach((recommendation) => {
    const recommendationCard = createRecommendationCard(recommendation);
    recommendationList.appendChild(recommendationCard);
  });
}

// Create recommendation card
function createRecommendationCard(recommendation) {
  const recommendationCard = document.createElement('div');
  recommendationCard.className = 'recommendation-card';

  const title = document.createElement('h3');
  title.textContent = recommendation.title;
  recommendationCard.appendChild(title);

  recommendationCard.addEventListener('click', async () => {
    await getRecipeInformation(recommendation.id); // Wait for recipe information to be fetched
    getRecommendations(recommendation.id);
  });

  return recommendationCard;
}

// Initialize the page with some recipes
async function initializePage() {
  const response = await fetch(`${API_ENDPOINT}/complexSearch?apiKey=${API_KEY}&number=12`);
  const data = await response.json();
  displayRecipes(data.results);
}

// Call the initializePage function when the page loads
window.addEventListener('load', initializePage);