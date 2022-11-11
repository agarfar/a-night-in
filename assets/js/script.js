var yesButtonEl = document.querySelector(".yes");
var foodMenuEl = document.querySelector(".tasty");
var startPageEl = document.querySelector(".start");
var cocktailInputEl = document.querySelector("#cocktail-input");
var cocktailBtnEl = document.querySelector(".cocktail-btn");
var dinnerBtnEl = document.querySelector(".dinner-btn");
var ingredientEl = document.querySelector(".ingredients");
var instructionsEl = document.querySelector(".instructions");
var cocktailNameEl = document.querySelector(".cocktail-name");
var dinnerIngredientEl = document.querySelector(".dinner-ingredients");
var dinnerInstructionsEl = document.querySelector(".dinner-instructions");
var dinnerNameEl = document.querySelector(".dinner-name");
var favoriteBtnEl = document.querySelector(".favorite-btn");
var dinnerSearchFormEl = document.querySelector("#dinner-search");
var dinnerInputEl = document.querySelector("#dinner-input");
var favoriteComboList = document.querySelector('.favorites-list');

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

var currentFavoriteCombo;
var cocktailFavorite;
var drinkIngrArray = [];
var drinkMeasureArray = [];
var favoriteCombo = [];
var recipeSearchHistory;

var chosenRecipeID;
var chosenRecipeTitle;
var cocktailName;
var cocktailID;

var cocktail;

var getSpoonacularID = function (dinner) {
  var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=63c3741b2d744176ad387ab7aa6a4032&query=${dinner}`;
  fetch(url, requestOptions).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data);
        var chosenRecipe =
          data.results[Math.floor(Math.random() * data.results.length)];
        // console.log(chosenRecipe);
        chosenRecipeID = chosenRecipe.id;
        var chosenRecipeImage = chosenRecipe.image;
        chosenRecipeTitle = chosenRecipe.title;
        // console.log(chosenRecipeID);
        // console.log(chosenRecipeImage);
        // console.log(chosenRecipeTitle);
        chosenRecipeInstructions(chosenRecipeID);
        dinnerNameEl.innerHTML = chosenRecipeTitle;
      });
    }
  });
};

var chosenRecipeInstructions = function (chosenRecipeID) {
  var url = `https://api.spoonacular.com/recipes/${chosenRecipeID}/information?apiKey=63c3741b2d744176ad387ab7aa6a4032`;
  fetch(url, requestOptions).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data, "recipe instructions array");
        var recipeInstructions = data.instructions;

        // console.log(recipeInstructions, "instructions");
        dinnerInstructionsEl.innerHTML = recipeInstructions;

        var ingredients = data.extendedIngredients;
        dinnerIngredientEl.innerHTML = "<h5 class='ingr-title'>Ingredients:</h5>";
        for (var i = 0; i < ingredients.length; i++) {
          var recipeIngredients = ingredients[i].original;
          dinnerIngredientEl.innerHTML += `<li>${recipeIngredients}</li>`;
          // console.log(recipeIngredients);
        }
      });
    }
  });
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  var dinner = dinnerInputEl.value;

  if (dinner) {
    getSpoonacularID(dinner);
  } else {
    alert("Please enter a dish");
  }
};

dinnerBtnEl.addEventListener("click", formSubmitHandler);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cd0d5f858cmshd6c0ec62f5398dap1ccc43jsnf57204214a17",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

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
      // console.log('alcoholList', data.drinks);
      var randomCocktail =
        data.drinks[Math.floor(Math.random() * data.drinks.length)];
      // console.log(randomCocktail);
      // console.log("randomCocktailID", randomCocktail.idDrink);
      cocktailID = randomCocktail.idDrink;
      displayCocktail(cocktailID);
    });
};

var displayCocktail = function (cocktailID) {
  fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
        // response.json();
      }
    })
    .then(function (data) {
      // console.log(data);
      for (i = 1; i <= 15; i++) {
        if (
          data.drinks[0][`strIngredient${i}`] === null ||
          data.drinks[0][`strMeasure${i}`] === null
        ) {
          break;
        }
        // console.log(data.drinks[0]['strIngredient1'])
        drinkIngrArray.push(data.drinks[0][`strIngredient${i}`]);
        drinkMeasureArray.push(data.drinks[0][`strMeasure${i}`]);
      }
      var template = "<h5 class='ingr-title'>Ingredients:</h5>";
      for (i = 0; i < drinkMeasureArray.length; i++) {
        // console.log(
        //   "Ingredient",
        //   drinkMeasureArray[i] + " " + drinkIngrArray[i]
        // );
        template += `<li>${drinkMeasureArray[i] + " " + drinkIngrArray[i]
          }</li>`;
      }
      // console.log("template", template);
      ingredientEl.innerHTML = template;

      cocktailName = data.drinks[0].strDrink;
      cocktailNameEl.innerHTML = data.drinks[0].strDrink;
      // cocktailFavorite = data.drinks[0].strDrink;
      instructionsEl.innerHTML = data.drinks[0].strInstructions;

      drinkIngrArray = [];
      drinkMeasureArray = [];
    });
};


var setFavoriteCombo = function () {
  recipeSearchHistory = JSON.parse(localStorage.getItem("recipeSearchHistory")) ?? [];
  if (chosenRecipeID && chosenRecipeTitle && cocktailID && cocktailName)
    favoriteCombo.push([[chosenRecipeID, chosenRecipeTitle], [cocktailID, cocktailName]])
  recipeSearchHistory.push(favoriteCombo);
  localStorage.setItem('recipeSearchHistory', JSON.stringify(recipeSearchHistory))
}

var getFavoriteCombos = function () {
  recipeSearchHistory = JSON.parse(localStorage.getItem("recipeSearchHistory")) ?? [];
}

var displayFavoriteCombos = function () {
  getFavoriteCombos();
  var template = "";

  if (recipeSearchHistory) {
    for (i = 0; i < recipeSearchHistory.length; i++) {
      template += `<li>${recipeSearchHistory[i][0][0][1] + ', ' + recipeSearchHistory[i][0][1][1]}</li>`;
    }

    favoriteComboList.innerHTML = template;
  }
}

favoriteBtnEl.addEventListener('click', function () {
  setFavoriteCombo();
  displayFavoriteCombos();
});

favoriteComboList.addEventListener('click', function (event) {
  if (event.target.matches("li")) {
    (event.target.innerText);
    
  }

})

cocktailBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  var cocktail = getCocktailID(cocktailInputEl.value);
  console.log("cocktail info", cocktail);
});

yesButtonEl.addEventListener("click", function () {
  foodMenuEl.classList.remove("hidden");
  startPageEl.classList.add("hidden");
});

// getFavoriteCombos();
displayFavoriteCombos();
