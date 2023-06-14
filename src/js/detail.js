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

window.addEventListener('DOMContentLoaded', () => {
  const programDetailsContainer = document.getElementById('program-details');

  // Function to fetch program details from Spoonacular API
  const fetchProgramDetails = async () => {
    const API_KEY = 'd7e900eb3f384a33841f51cf7038e120';

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const recipeId = urlParams.get('recipeId');

      if (!recipeId) {
        // Jika query parameter recipeId tidak ditemukan
        // Lakukan penanganan kesalahan atau tindakan yang sesuai, misalnya:
        console.log('Error: Recipe ID not found in query parameters.');
        // Atau alihkan pengguna ke halaman lain, misalnya:
        window.location.href = 'error.html';
      }
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`);
      
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
    
    // Display instructions
    const instructionsContainer = document.createElement('div');
    instructionsContainer.classList.add('instructions-container');
    const instructionsTitle = document.createElement('h4');
    instructionsTitle.textContent = 'Instructions';
    instructionsContainer.appendChild(instructionsTitle);

    const instructionsList = document.createElement('ul');
    for (const step of program.analyzedInstructions[0].steps) {
      const instructionsItem = document.createElement('li');
      instructionsItem.textContent = `${step.step}`;
      instructionsList.appendChild(instructionsItem);
    }

    instructionsContainer.appendChild(instructionsList);
    programCard.appendChild(instructionsContainer);


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

