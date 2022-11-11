var yesButtonEl = document.querySelector(".yes");
var foodMenuEl = document.querySelector(".tasty");
var startPageEl = document.querySelector(".start");
var cocktailInputEl = document.querySelector('#cocktail-input');
var cocktailBtnEl = document.querySelector('.cocktail-btn');
var dinnerBtnEl = document.querySelector('.dinner-btn')
var ingredientEl = document.querySelector('.ingredients');
var instructionsEl = document.querySelector('.instructions');
var cocktailNameEl = document.querySelector('.cocktail-name');
var favoriteBtnEl = document.querySelector('.favorite-btn')
var dinnerSearchFormEl = document.querySelector("#dinner-search");
var dinnerInputEl = document.querySelector("#dinner-input");
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

var cocktailFavorite;
var drinkIngrArray = [];
var drinkMeasureArray = [];

var cocktailID;
var cocktail;




var getSpoonacularID = function (dinner) {
    var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=e1b602421bad484d867c8e45948bb384&query=${dinner}`
    fetch(url, requestOptions).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                var chosenRecipe = data.results[Math.floor(Math.random() * data.results.length)];
                console.log(chosenRecipe);
                var chosenRecipeID = chosenRecipe.id
                var chosenRecipeImage = chosenRecipe.image;
                var chosenRecipeTitle = chosenRecipe.title;
                console.log(chosenRecipeID);
                console.log(chosenRecipeImage);
                console.log(chosenRecipeTitle);
                chosenRecipeInstructions(chosenRecipeID);


            });
        }
    });
};



var chosenRecipeInstructions = function (chosenRecipeID) {
    var url = `https://api.spoonacular.com/recipes/${chosenRecipeID}/information?apiKey=e1b602421bad484d867c8e45948bb384`
    fetch(url, requestOptions).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data, 'recipe instructions array');
                var recipeInstructions = data.instructions;

                console.log(recipeInstructions, 'instructions');
                var ingredients = data.extendedIngredients;
                for (var i = 0; i < ingredients.length; i++) {
                    var recipeIngredients = ingredients[i].original;
                    console.log(recipeIngredients);
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
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'cd0d5f858cmshd6c0ec62f5398dap1ccc43jsnf57204214a17',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

var getCocktailID = function (alcohol) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`, requestOptions)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            // console.log('alcoholList', data.drinks);
            var randomCocktail = data.drinks[Math.floor(Math.random() * data.drinks.length)]
            console.log(randomCocktail);
            console.log('randomCocktailID', randomCocktail.idDrink)
            cocktailID = randomCocktail.idDrink;
            displayCocktail(cocktailID)
        })
}

var displayCocktail = function (cocktailID) {
    fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
                // response.json();
            }
        })
        .then(function (data) {
            console.log(data)
            for (i = 1; i <= 15; i++) {
                if (data.drinks[0][`strIngredient${i}`] === null || data.drinks[0][`strMeasure${i}`] === null) {
                    break
                }
                // console.log(data.drinks[0]['strIngredient1'])
                drinkIngrArray.push(data.drinks[0][`strIngredient${i}`])
                drinkMeasureArray.push(data.drinks[0][`strMeasure${i}`])
            }
            var template = "<h5 class='ingr-title'>Ingredients:</h5>";
            for (i = 0; i < drinkMeasureArray.length; i++) {
                console.log('Ingredient', (drinkMeasureArray[i] + ' ' + drinkIngrArray[i]))
                template += `<li>${drinkMeasureArray[i] + ' ' + drinkIngrArray[i]}</li>`
            }
            console.log("template", template);
            ingredientEl.innerHTML = template;

            cocktailNameEl.innerHTML = data.drinks[0].strDrink;
            cocktailFavorite = data.drinks[0].strDrink;
            instructionsEl.innerHTML = data.drinks[0].strInstructions;

            drinkIngrArray = [];
            drinkMeasureArray = [];
        })
}

cocktailBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    var cocktail = getCocktailID(cocktailInputEl.value)
    console.log('cocktail info', cocktail)
})

yesButtonEl.addEventListener("click", function () {
    foodMenuEl.classList.remove("hidden");
    startPageEl.classList.add("hidden");
});