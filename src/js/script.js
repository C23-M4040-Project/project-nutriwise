/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
// API endpoint and key
const API_ENDPOINT = 'https://api.spoonacular.com/recipes';
const API_KEY = 'd5de6210a75a47b5b4559c6d120e584d';

// DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipeList = document.getElementById('recipe-list');
const recipeArticle = document.getElementById('recipe-article');
const recommendationList = document.getElementById('recommendation-list');
const nutritionData = document.getElementById('nutrition-data');

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
function createRecipeCard(recipe) {
  const recipeCard = document.createElement('div');
  recipeCard.className = 'recipe-card';

  const image = document.createElement('img');
  image.src = recipe.image;
  recipeCard.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = recipe.title;
  recipeCard.appendChild(title);

  recipeCard.addEventListener('click', () => {
    getRecipeInformation(recipe.id);
  });

  return recipeCard;
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
    getNutritionInformation(recommendation.id);
  });

  return recommendationCard;
}