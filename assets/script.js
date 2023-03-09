// Use querySelector to select search-button and make it into a variable labeled searchButton
var tableBody = document.getElementById('repo-table');
var recpBody = document.getElementById('recp-table');
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
        console.log('data', data)
        console.log(data.data.length);

        for (var i = 0; i < data.data.length; i++) {

            // Creating elements, tablerow, tabledata, and anchor
            var createTableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            var plant = document.createElement('a');
        
            // Setting the text of plant while making sure that no plants are repeated
            if (i > 0) {
                var count = 0;
                // Checking to see if the plants name has been previously appended
                for (var j = 1; j < i + 1; j++) {
                    if (data.data[i].common_name !== data.data[j - 1].common_name) {
                        count++;
                    }
                }
                if (count === (i)) {
                    plant.textContent = data.data[i].common_name;
                    console.log(data.data[i].common_name);

                    // Appending the link to the tabledata and then appending the tabledata to the tablerow
                    // The tablerow then gets appended to the tablebody
                    tableData.appendChild(plant);
                    createTableRow.appendChild(tableData);
                    tableBody.appendChild(createTableRow);
                }
            }
            else {
                plant.textContent = data.data[i].common_name;
                console.log(data.data[i].common_name);

                // Appending the palnt to the tabledata and then appending the tabledata to the tablerow
                // The tablerow then gets appended to the tablebody
                tableData.appendChild(plant);
                createTableRow.appendChild(tableData);
                tableBody.appendChild(createTableRow);
            }
        }
        
    })
    
    }

    // Adds event listener to retrieve getApi function
    searchButton.addEventListener('click', getApi); 

    // Function to retrieve recipes by ingredients using spoontacular API
    function getRecipeIngr() {
        console.log(keyWord);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '330bf6c932msh6e1ac73e9c79e8dp1dc19fjsn2174e9f05343',
                'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };
        
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${keyWord}&diet=vegetarian&number=30&ignorePantry=true&ranking=1`, options)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                for (var i = 0; i < response.length; i++) {

                    // Creating elements, tablerow, tabledata, and anchor
                    var createTableRow = document.createElement('tr');
                    var tableData = document.createElement('td');
                    var dish = document.createElement('a');
                
                    // Setting the text of dish while making sure that no dishes are repeated
                    if (i > 0) {
                        var count = 0;
                        // Checking to see if the dish's name has been previously appended
                        for (var j = 1; j < i + 1; j++) {
                            if (response[i].title !== response[j - 1].title) {
                                count++;
                            }
                        }
                        if (count === (i)) {
                            dish.textContent = response[i].title;
                            console.log(response[i].title);
        
                            // Appending the dish to the tabledata and then appending the tabledata to the tablerow
                            // The tablerow then gets appended to the tablebody
                            tableData.appendChild(dish);
                            createTableRow.appendChild(tableData);
                            recpBody.appendChild(createTableRow);
                        }
                    }
                    else {
                        dish.textContent = response[i].title;
                        console.log(response[i].title);
        
                        // Appending the dish to the tabledata and then appending the tabledata to the tablerow
                        // The tablerow then gets appended to the tablebody
                        tableData.appendChild(dish);
                        createTableRow.appendChild(tableData);
                        recpBody.appendChild(createTableRow);
                    }
                 }
            })
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