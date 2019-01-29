fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    console.log(productInfo)
                    // food.ingredients = productInfo.product.ingredients.map(i => {
                    //     return `<li>${i.text}</li>`
                    // }).join("")
                    food.ingredients = productInfo.product.ingredients.reduce((a, c) => {
                      return `${a}<li>${c.text}</li>`
                    },"")
                    
                    food.country = productInfo.product.countries
                    productInfo.product.nutriments.energy_serving
                    food.fat = productInfo.product.nutriments.fat_serving
                    food.sugars = productInfo.product.nutriments.sugars_serving
                    
                    // Produce HTML representation...the food argument is past in from the forEach statement at the top
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })

//function to create HTML template
    const foodFactory = (food) => {
        return `
                <div class="food__items">
                <h3>${food.name}</h3>
                <h4>Ethnicity</h4>
                <div class="descriptions ethnicity">${food.ethnicity}</div>
                <h4>Category</h4>
                <div class="descriptions category">${food.category}</div>
                <h4>Ingredients</h4>
                <div class="descriptions ingredients">${food.ingredients}</div>
                <h4>Country</h4>
                <div class="descriptions country">${food.country}</div>
                <h4>Calories Per Serving</h4>
                <div class="descriptions calories">${food.calories}</div>
                <h4>Fat Per Serving</h4>
                <div class="descriptions fat">${food.fat}</div>
                <h4>Sugars Per Serving</h4>
                <div class="descriptions sugar">${food.sugars}</div>
    </div>
                `
    }
//function to add the 
    const addFoodToDom = (foodAsHTML) => {
        document.querySelector(".foodList").innerHTML += foodAsHTML
    }
