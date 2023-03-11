// Use querySelector to select search-button and make it into a variable labeled searchButton
var tableBody =  document.getElementById('repo-table');
var recpBody =  document.getElementById('recp-table');
var searchButton = document.querySelector('#search-button');
var searchBar = document.querySelector('#search-bar');
var keyWord = document.querySelector('#search-bar').value;

// Function used to retrieve species-list information regarding the perrenual API
function getApi() {
    keyWord = document.querySelector('#search-bar').value;
    var requestUrl = `https://perenual.com/api/species-list?key=sk-I07P640155763222b151&q=${keyWord}&edible=1`;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log('data', data);
        
        // Removes old children
        const childLength = tableBody.children.length;

        for(var i = 0; i < childLength; i++) {
            tableBody.removeChild(tableBody.children[0]);
        }

        // Checks to see if search bar is empty and if there are any matching results
        if(keyWord !== "" && data.data.length > 0) {
            // Creating elements, tablerow, tabledata, anchor, and image
            var createTableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            var plant = document.createElement('h4');
            var plantScn = document.createElement('p');
            var plantCycle = document.createElement('p')
            var plantSunlight = document.createElement('p')
            var plantWatering = document.createElement('p')

            // Setting the text of plant to the first matching result
            plant.textContent = data.data[0].common_name;
            plantScn.textContent = data.data[0].scientific_name;
            plantSunlight.textContent = data.data[0].sunlight;

            // Appending the plant and plant image to the tabledata and then appending the tabledata to the tablerow
            // The tablerow then gets appended to the tablebody
            tableData.appendChild(plant);
            tableData.appendChild(plantScn);
            tableData.appendChild(plantSunlight);
            createTableRow.appendChild(tableData);
            tableBody.appendChild(createTableRow);
        }
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
        
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${keyWord}&number=5`, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                
                // Removes old children
                const childLength = recpBody.children.length;
                for(var i = 0; i < childLength; i++) {
                    recpBody.removeChild(recpBody.children[0]);
                }

                // Checks to see if search bar is empty
                if(keyWord !== "") {
                    for (var i = 0; i < response.results.length; i++) {
                    getRecipeInfo(response.results)
                        // Creating elements, tablerow, tabledata, anchor, and image
                        var createTableRow = document.createElement('tr');
                        var tableData = document.createElement('td');
                        var dish = document.createElement('h3');
                        var dishLink = document.createElement('a');
                        var dishImg = document.createElement('img')
                        
                    
                        // Setting the text of dish while making sure that no dishes are repeated
                        if (i > 0) {
                            var count = 0;
                            // Checking to see if the dish's name has been previously appended
                            for (var j = 1; j < i + 1; j++) {
                                if (response.results[i].title !== response.results[j-1].title) {
                                    count++;
                                }
                            }
                            if (count === (i)) {
                                dish.textContent = response.results[i].title;
                                dishLink.textContent = response.results[i].sourceUrl;
                                dishLink.href = response.results[i].sourceUrl;
            
                                // Appending the dish and dish image to the tabledata and then appending the tabledata to the tablerow
                                // The tablerow then gets appended to the tablebody
                                tableData.appendChild(dish);
                                tableData.appendChild(dishLink);
                                createTableRow.appendChild(tableData);
                                recpBody.appendChild(createTableRow);
                            }
                        }
                        else {
                            dish.textContent = response.results[i].title;
                            dishLink.textContent = response.results[i].sourceUrl;
                            dishLink.href = response.results[i].sourceUrl;
                            // Appending the dish and dish image to the tabledata and then appending the tabledata to the tablerow
                            // The tablerow then gets appended to the tablebody
                            tableData.appendChild(dish);
                            tableData.appendChild(dishLink);
                            createTableRow.appendChild(tableData);
                            recpBody.appendChild(createTableRow);
                        }
                    }
                }
            })
            getRecipeInfo(keyWord);
            // .catch(err => console.error(err));            
    }

    // connects previous made event listener to be able to retrieve data from getRecipeIngr function
    searchButton.addEventListener('click', getRecipeIngr);

    // Function to retrieve recipe information using spoontacular API, uses GET method. This will retrieve an object with 1 recipe and its data
    function getRecipeInfo(results) {
        

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '330bf6c932msh6e1ac73e9c79e8dp1dc19fjsn2174e9f05343',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ingredients=${keyWord}&ignorePantry=true&ranking=1`, options)
            .then(response => response.json())
            .then(response => console.log(response));
        
    }
    // connects previous made event listener to be able to retrieve data from getRecipeInfo function
    searchButton.addEventListener('click',  getRecipeInfo);