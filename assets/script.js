// Use querySelector to select search-bar and make it into a variable labeled searchButton
var searchButton = document.querySelector('#search-bar');

// Function used to retrieve species-list information regarding the perrenual API
function getApi() {
    var requestUrl = ' https://perenual.com/api/species-list?page=1&key=sk-I07P640155763222b151&&edible=1';

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
        console.log('data', data)
    })
    
    }

    // Adds event listener to retrieve getApi function
    searchButton.addEventListener('click', getApi); 

    // Function to retrieve recipes by ingredients using spoontacular API
    function getRecipeIngr() {
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

    // connects previous made event listener to be able to retrieve data from getRecipeIngr function
    searchButton.addEventListener('click', getRecipeIngr);

    // Function to retrieve recipe information using spoontacular API, uses GET method. This will retrieve an object with 1 recipe and its data
    function getRecipeInfo() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '330bf6c932msh6e1ac73e9c79e8dp1dc19fjsn2174e9f05343',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        
        fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
            
    }
    // connects previous made event listener to be able to retrieve data from getRecipeInfo function
    searchButton.addEventListener('click',  getRecipeInfo);