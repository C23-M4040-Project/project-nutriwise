window.addEventListener('DOMContentLoaded', () => {
  const programDetailsContainer = document.getElementById('program-details');

  // Function to fetch program details from Spoonacular API
  const fetchProgramDetails = async () => {
    const API_KEY = 'd7e900eb3f384a33841f51cf7038e120';

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=${API_KEY}&includeNutrition=true`);

      if (!response.ok) {
        throw new Error('Error fetching program details');
      }

      const data = await response.json();

      // Display program details
      displayProgramDetails(data);
    } catch (error) {
      console.log(error);
      programDetailsContainer.innerHTML = 'Error fetching program details';
    }
  };

  // Function to display program details on the page
  const displayProgramDetails = (program) => {
    const programCard = document.createElement('div');
    programCard.classList.add('program-card');
  
    const programImage = document.createElement('img');
    programImage.src = program.image;
    programImage.alt = program.title;
    programCard.appendChild(programImage);
  
    const programTitle = document.createElement('h3');
    programTitle.textContent = program.title;
    programCard.appendChild(programTitle);
  
    const programDescription = document.createElement('p');
    programDescription.innerHTML = program.summary;
    programCard.appendChild(programDescription);
  
    // Display extended ingredients
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('ingredients-container');
    const ingredientsTitle = document.createElement('h4');
    ingredientsTitle.textContent = 'Ingredients';
    ingredientsContainer.appendChild(ingredientsTitle);
  
    const ingredientsList = document.createElement('ul');
    for (const ingredient of program.extendedIngredients) {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient.original;
      ingredientsList.appendChild(ingredientItem);
    }
  
    ingredientsContainer.appendChild(ingredientsList);
    programCard.appendChild(ingredientsContainer);
  
    // Display nutrition details
    const nutritionContainer = document.createElement('div');
    nutritionContainer.classList.add('nutrition-container');
    const nutritionTitle = document.createElement('h4');
    nutritionTitle.textContent = 'Nutrition Information';
    nutritionContainer.appendChild(nutritionTitle);
  
    const nutritionList = document.createElement('ul');
    for (const nutrient of program.nutrition.nutrients) {
      const nutrientItem = document.createElement('li');
      nutrientItem.textContent = `${nutrient.name}: ${nutrient.amount} ${nutrient.unit}`;
      nutritionList.appendChild(nutrientItem);
    }
  
    nutritionContainer.appendChild(nutritionList);
    programCard.appendChild(nutritionContainer);
  
    programDetailsContainer.appendChild(programCard);
  };
  

  // Fetch program details when the page loads
  fetchProgramDetails();
});
