var yesButtonEl = document.querySelector('.yes')
var foodMenuEl = document.querySelector('.tasty')
var startPageEl = document.querySelector('.start')


yesButtonEl.addEventListener('click', function () {
    foodMenuEl.classList.remove('hidden');
    startPageEl.classList.add('hidden');
})

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '2a04cdf469msh1e78a92a5670198p13c589jsnc62862abddff',
//         'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
//     }
// };

// fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=enchilada', options)
//     .then(function (response) {
//         if (response.ok) {
//             console.log(response);
//             return response.json();
//         }
//     })
//     .then(function (data) {
//         console.log(data.results)
//     })