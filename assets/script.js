var searchButton = document.querySelector('#search-bar');

function getApi() {
    var requestUrl = ' https://perenual.com/api/species-list?page=1&key=sk-I07P640155763222b151&&edible=true';

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
        console.log('data', data)
    })
    
    }
    searchButton.addEventListener('click', getApi);

    function displayRecipe() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '330bf6c932msh6e1ac73e9c79e8dp1dc19fjsn2174e9f05343',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        
        fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=herbs&ingredients=plants&ingredients=vegetables&diet=vegetarian&number=30&ignorePantry=true&ranking=1', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
            
    }

    searchButton.addEventListener('click', displayRecipe);