import { saveRecipes, getRecipes } from './recipes'
import { renderRecipes } from './views'
import { generateIngredientDOM } from './ingredients'
const recipeId = location.hash.substring(1)
const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
const renderIngredients = () => {
    const ingredientEl = document.querySelector('#ingredients')
    ingredientEl.innerHTML = ''
    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
            ingredientEl.appendChild(generateIngredientDOM(ingredient))
        })
    }
    saveRecipes()
}


export { renderIngredients }