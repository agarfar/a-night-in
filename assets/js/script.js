var yesButtonEl = document.querySelector(".yes");
var foodMenuEl = document.querySelector(".tasty");
var startPageEl = document.querySelector(".start");

yesButtonEl.addEventListener("click", function () {
  foodMenuEl.classList.remove("hidden");
  startPageEl.classList.add("hidden");
});

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

var getSpoonacularID = function (dinner) {
  var url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=e1b602421bad484d867c8e45948bb384&query=${dinner}`
  fetch(url, requestOptions).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var chosenRecipe=  data.results[Math.floor(Math.random() * data.results.length)];
        console.log(chosenRecipe);
        var chosenRecipeID = chosenRecipe.id
        var chosenRecipeImage = chosenRecipe.image;
        var chosenRecipeTitle = chosenRecipe.title;
        console.log(chosenRecipeID);
        console.log(chosenRecipeImage);
        console.log(chosenRecipeTitle);
        // localStorage.setItem(chosenRecipeID,"recipeID");
        chosenRecipeInstructions(chosenRecipeID);
        
        
      });
    }
  });
};
getSpoonacularID();

var chosenRecipeInstructions = function (chosenRecipeID){
  var url = `https://api.spoonacular.com/recipes/${chosenRecipeID}/information?apiKey=e1b602421bad484d867c8e45948bb384`
  fetch(url, requestOptions).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data, 'recipe instructions array');
        var recipeInstructions = data.instructions;

        console.log(recipeInstructions,'instructions');
        var ingredients = data.extendedIngredients;
        for (var i = 0; i < ingredients.length; i++){
          var recipeIngredients = ingredients[i].original;
          console.log(recipeIngredients);
        }
      });
    }
  });
};


// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "cd0d5f858cmshd6c0ec62f5398dap1ccc43jsnf57204214a17",
//     "X-RapidAPI-Host": "tasty.p.rapidapi.com",
//   },
// };



// var getTastyAPI = function (dinner) {
//   var url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${dinner}`;
//   fetch(url, options).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         console.log(data);

//         var randomRecipe =
//           data.results[Math.floor(Math.random() * data.results.length)];
//         console.log(randomRecipe, "random recipe array");
//         var currentName = randomRecipe.name;
//         console.log(currentName, "recipe name");

//         var instructionsArray = randomRecipe.instructions;

//         var currentSection = randomRecipe.sections;
//         console.log(currentSection, "current section");


//         let template ="";

//         for (var i = 0; i < currentSection.length; i++) {

//           var splitSections = currentSection[i];
//           console.log(splitSections, "each section");

//           var sectionName = splitSections.name;
//           if (sectionName !== null){
//             console.log(sectionName, 'section name');
//           }
      
//           // build outer container

//           var ingredientArray = currentSection[i].components;
//           console.log(ingredientArray, 'ingredientArray');

//           for (var j = 0; j < ingredientArray.length; j++) {
//             var ingredient = ingredientArray[j].raw_text;
//             console.log(ingredient, 'ingredient')
//             // build inner container
//           }

//           //add to template + built template

//         }

//         for (var i = 0; i < instructionsArray.length; i++) {
//           var currentInstructions = randomRecipe.instructions[i].display_text;
//           console.log(currentInstructions, "INSTRUCTIONS");
//         }

//         var recipePhotos = randomRecipe.thumbnail_url;
//         console.log(recipePhotos, "thumbnail");
//       });
//     }
//   });
// };
// getTastyAPI();

var dinnerSearchFormEl = document.querySelector("#dinner-search");
var dinnerInputEl = document.querySelector("#dinner-input");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var dinner = dinnerInputEl.value;

  if (dinner) {
    getSpoonacularID(dinner);
  } else {
    alert("Please enter a dish");
  }
};

dinnerSearchFormEl.addEventListener("submit", formSubmitHandler);
