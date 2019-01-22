fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
        loopper(parsedFoods) //calls the loopper fucntion and pass in the foods//
    })
//Make an HTML component for each food
const createFoodHTML = food => `
   <section class="foodListOne">
   <header class="foodName">
     <h1>${food.name}</h1>
   </header>

   <p class="foodCategory">
     ${food.category}
   </p>

   <p class="foodEthnicity">
   ${food.ethnicity}
   </p>  
   </div>    
`
//Put component on DOM...you can also seperate this loop
function loopper(foods) {
    for (let food of foods) {
        const theFoodHTML = createFoodHTML(food)

        const storageContainer = document.querySelector(".foodList")

        storageContainer.innerHTML += theFoodHTML
    }
}