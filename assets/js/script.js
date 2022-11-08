// var apiKey = 'cd0d5f858cmshd6c0ec62f5398dap1ccc43jsnf57204214a17';

// var getTastyAPI = function () {
//     var url = `https://tasty.p.rapidapi.com/recipes/list&X-RapidAPI-Key=${apiKey}`;
//     fetch(url).then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//             console.log(data)
//         });
//       } 
//     });
//   };
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cd0d5f858cmshd6c0ec62f5398dap1ccc43jsnf57204214a17',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

var getTastyAPI = function () {
// fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=enchilada', options)
	.then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    var randomRecipe = data.results[Math.floor(Math.random()*data.results.length)]
                    var currentName = randomRecipe.name;
                    console.log(currentName,'recipe name');

                    var instructionsArray = randomRecipe.instructions;
                
                    for (var i = 0; i < instructionsArray.length; i++ ) {
                        var currentInstructions = randomRecipe.instructions[i].display_text;
                        console.log(currentInstructions, 'INSTRUCTIONS');
                    }
                    
                    
                });
              };
            });
        };
getTastyAPI();