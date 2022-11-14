var yesButtonEl = document.querySelector(".yes");
var foodMenuEl = document.querySelector(".tasty");
var startPageEl = document.querySelector(".start");
var cocktailInputEl = document.querySelector("#cocktail-input");

var cocktailBtnEl = document.querySelector(".cocktail-btn");
var dinnerBtnEl = document.querySelector(".dinner-btn");

var ingredientHeaderEl = document.querySelector('.drink-ingredients-header')
var ingredientEl = document.querySelector(".ingredients");
var instructionsHeaderEl = document.querySelector('.drink-instructions-header')
var instructionsEl = document.querySelector(".instructions");
var cocktailNameEl = document.querySelector(".cocktail-name");
var cocktailImageEl = document.querySelector("#drink-image")

var dinnerIngredientsHeaderEl = document.querySelector('.dinner-ingredients-header')
var dinnerImageEl = document.querySelector("#recipe-image")
var dinnerIngredientEl = document.querySelector(".dinner-ingredients");
var dinnerInstructionsHeaderEl = document.querySelector('.dinner-instructions-header')
var dinnerInstructionsEl = document.querySelector(".dinner-instructions");
var dinnerNameEl = document.querySelector(".dinner-name");

var favoriteComboList = document.querySelector('.favorites-list');
var favoriteBtnEl = document.querySelector(".favorite-btn");

var dinnerSearchFormEl = document.querySelector("#dinner-search");
var dinnerInputEl = document.querySelector("#dinner-input");

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

var currentFavoriteCombo;
var cocktailFavorite;
var drinkIngrArray = [];
var drinkMeasureArray = [];
var favoriteCombo = {};
var recipeSearchHistory;

var chosenRecipeID;
var chosenRecipeTitle;
var chosenRecipeImage;
var cocktailName;
var cocktailID;
var cocktailImg;
var cocktail;

// generates random recipe ID from search query for use as a paramter to acquire recipe information
var getSpoonacularID = function (dinner) {
  var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=b286b8d959d04a8b8162b7f531ff9213&query=${dinner}`;
  fetch(url, requestOptions).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var chosenRecipe =
          data.results[Math.floor(Math.random() * data.results.length)];
        chosenRecipeID = chosenRecipe.id;
        chosenRecipeImage = chosenRecipe.image;
        dinnerImageEl.innerHTML = `<img src='${chosenRecipeImage}'/>`;
        chosenRecipeInstructions(chosenRecipeID);
      });
    }
  });
};

// used in getSpoonacularID to acquire specific recipe information
var chosenRecipeInstructions = function (chosenRecipeID) {
  var url = `https://api.spoonacular.com/recipes/${chosenRecipeID}/information?apiKey=b286b8d959d04a8b8162b7f531ff9213`;
  fetch(url, requestOptions).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data, "recipe instructions array");
        chosenRecipeTitle = data.title;
        dinnerNameEl.innerHTML = chosenRecipeTitle;
        var recipeInstructions = data.instructions;
        dinnerInstructionsEl.innerHTML = recipeInstructions;
        var ingredients = data.extendedIngredients;
        dinnerIngredientsHeaderEl.innerHTML = 'Ingredients';
        dinnerInstructionsHeaderEl.innerHTML = 'Instructions';
        for (var i = 0; i < ingredients.length; i++) {
          var recipeIngredients = ingredients[i].original;
          dinnerIngredientEl.innerHTML += `<li>${recipeIngredients}</li>`;
        }
      });
    }
  });
};

// runs getSpoonacularID witth user's input to generate a random recipe with ingredients list and instructions
var formSubmitHandler = function (event) {
  event.preventDefault();
  var dinner = dinnerInputEl.value;

  if (dinner) {
    dinnerIngredientEl.innerHTML = '';
    getSpoonacularID(dinner);
  }

};

// uses user input of ingredient or alcohol choice to generate random cocktail recipe ID for use in displayCocktail function
var getCocktailID = function (alcohol) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`,
    requestOptions
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      var randomCocktail =
        data.drinks[Math.floor(Math.random() * data.drinks.length)];
      cocktailID = randomCocktail.idDrink;
      displayCocktail(cocktailID);
    });
};

// uses random cocktail ID to generate and display ingredients and directions
var displayCocktail = function (cocktailID) {
  fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      for (i = 1; i <= 15; i++) {
        if (
          data.drinks[0][`strIngredient${i}`] === null ||
          data.drinks[0][`strMeasure${i}`] === null
        ) {
          break;
        }
        drinkIngrArray.push(data.drinks[0][`strIngredient${i}`]);
        drinkMeasureArray.push(data.drinks[0][`strMeasure${i}`]);
      }
      var template = "";
      for (i = 0; i < drinkMeasureArray.length; i++) {
        template += `<li>${drinkIngrArray[i] + ' - ' + drinkMeasureArray[i]
          }</li>`;
      }
      ingredientHeaderEl.innerHTML = 'Ingredients';
      ingredientEl.innerHTML = template;

      cocktailImg = data.drinks[0].strDrinkThumb
      cocktailName = data.drinks[0].strDrink;
      cocktailNameEl.innerHTML = data.drinks[0].strDrink;

      cocktailImageEl.innerHTML = `<img src='${cocktailImg + '/preview'}'/>`
      instructionsHeaderEl.innerHTML = 'Instructions';
      instructionsEl.innerHTML = data.drinks[0].strInstructions;

      drinkIngrArray = [];
      drinkMeasureArray = [];
    });
};

// saves currently displayed recipes' information as an object, then saves it within a recipeSearchHistory array in localStorage
var setFavoriteCombo = function () {
  recipeSearchHistory = JSON.parse(localStorage.getItem("recipeSearchHistory")) ?? [];
  if (chosenRecipeID && chosenRecipeTitle && cocktailID && cocktailName) {
    favoriteCombo['favRecipeID'] = chosenRecipeID;
    favoriteCombo['favRecipeName'] = chosenRecipeTitle;
    favoriteCombo['favRecipeImg'] = chosenRecipeImage;
    favoriteCombo['favCocktailID'] = cocktailID;
    favoriteCombo['favCocktailName'] = cocktailName;
    favoriteCombo['favCocktailImg'] = cocktailImg;
    recipeSearchHistory.push(favoriteCombo);
  }
  localStorage.setItem('recipeSearchHistory', JSON.stringify(recipeSearchHistory))
  favoriteCombo = {};

}

// returns recipeSearchHistory array from local storage
var getFavoriteCombos = function () {
  recipeSearchHistory = JSON.parse(localStorage.getItem("recipeSearchHistory")) ?? [];
}

// displays favorited combos from local storage on the page
var displayFavoriteCombos = function () {
  getFavoriteCombos();
  var template = "";

  if (recipeSearchHistory) {
    for (i = 0; i < recipeSearchHistory.length; i++) {
      template += `<li class = "fav-combo p-1 rounded mb-2">${recipeSearchHistory[i].favRecipeName + ', ' + recipeSearchHistory[i].favCocktailName}</li>`;
    }
    console.log(template);
    favoriteComboList.innerHTML = template;
  }
}

// navigates user from start page to menu display when "Yes" is clicked
yesButtonEl.addEventListener("click", function () {
  foodMenuEl.classList.remove("hidden");
  foodMenuEl.classList.add("d-flex");
  startPageEl.classList.add("hidden");
});

// saves currently displayed recipes to Favorites list on click
favoriteBtnEl.addEventListener('click', function () {
  setFavoriteCombo();
  displayFavoriteCombos();
});

// clicking paired items in Favorites list displays the relevant recipes' information to the page
favoriteComboList.addEventListener('click', function (event) {
  if (event.target.matches("li")) {
    for (i = 0; i < recipeSearchHistory.length; i++) {
      if (recipeSearchHistory[i].favRecipeName + ', ' + recipeSearchHistory[i].favCocktailName === event.target.innerText) {
        dinnerIngredientEl.innerHTML = '';
        displayCocktail(recipeSearchHistory[i].favCocktailID)
        chosenRecipeInstructions(recipeSearchHistory[i].favRecipeID)
        dinnerImageEl.innerHTML = `<img src='${recipeSearchHistory[i].favRecipeImg}'/>`;
        cocktailImageEl.innerHTML = `<img src='${recipeSearchHistory[i].favCocktailImg + "/preview"}'/>`
      }
    }
  }

})

// displays random cocktail information on click
cocktailBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  var cocktail = getCocktailID(cocktailInputEl.value);
});

// displays random recipe information on click
dinnerBtnEl.addEventListener("click", formSubmitHandler);

// display any stored favorite combos to page
displayFavoriteCombos();
