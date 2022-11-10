var yesButtonEl = document.querySelector('.yes');
var foodMenuEl = document.querySelector('.tasty');
var startPageEl = document.querySelector('.start');
var cocktailInputEl = document.querySelector('#cocktail-input');
var cocktailBtnEl = document.querySelector('.cocktail-btn');
var ingredientEl = document.querySelector('.ingredients');
var instructionsEl = document.querySelector('.instructions');
var cocktailNameEl = document.querySelector('.cocktail-name')

var drinkIngrArray = [];
var drinkMeasureArray = [];

// var cocktailID;
// var alcohol
var cocktailID;
var cocktail;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'cd0d5f858cmshd6c0ec62f5398dap1ccc43jsnf57204214a17',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};



// var getTastyAPI = function () {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
//     // fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
//     fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=enchilada', requestOptions)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log(data);

//                     var randomRecipe = data.results[Math.floor(Math.random() * data.results.length)]
//                     var currentName = randomRecipe.name;
//                     console.log(currentName, 'recipe name');

//                     var instructionsArray = randomRecipe.instructions;

//                     for (var i = 0; i < instructionsArray.length; i++) {
//                         var currentInstructions = randomRecipe.instructions[i].display_text;
//                         console.log(currentInstructions, 'INSTRUCTIONS');
//                     }


//                 });
//             };
//         });
// };
// getTastyAPI();

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
            var template = "";
            for (i = 0; i < drinkMeasureArray.length; i++) {
                console.log('Ingredient', (drinkMeasureArray[i] + ' ' + drinkIngrArray[i]))
                template += `<li>${drinkMeasureArray[i] + ' ' + drinkIngrArray[i]}</li>`
            }
            console.log("template", template);
            ingredientEl.innerHTML = template;


            instructionsEl.innerHTML = data.drinks[0].strInstructions;

        })
}

// var favoritePairings = function(){
// grab dish and cocktail unique ids 
// push [dishID,cocktailID] into array containing all saved pairings
// convert to string and set to local storage

// display saved pairings to screen in Favorites/Saved dishes div
// use tasty detail endpoint and cocktail default api search by id parameter with localStorage array values as inputs
// use previously set functions to write to page
// click on saved item to generate that dish/cocktail information to page

// }

// fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailID}`, requestOptions)
//     .then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 console.log(data);
//                

//                 // for ingredients: push strIngredient1, strIngredient2, etc. into an array - if null, stop pushing
//                 // ^same thing for strMeasure1, strMeasure2
//                 // concatenate measure and ingredient thru for loop

//                 // for instructions: data.drinks/strInstructions

//                 // for image thumbnail: '<image url>' + "/preview"

//             })

//         }


//     }

//     )




yesButtonEl.addEventListener('click', function () {
    foodMenuEl.classList.remove('hidden');
    startPageEl.classList.add('hidden');
})

cocktailBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    var cocktail = getCocktailID(cocktailInputEl.value)
    console.log('cocktail info', cocktail)
    // displayCocktail(cocktail);
})


// getCocktailAPI();