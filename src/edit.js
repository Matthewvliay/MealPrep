import { generateIngredientDOM, renderRecipes, initializeEditPage, statusMessage } from './views'
import { updateRecipe, removeRecipe, removeIngredient, getRecipes, saveRecipes, createIngredient, createRecipe, loadRecipes } from './recipes'
const recipeId = location.hash.substring(1)
let recipes = []
const loadPage = () => {
    const recipesList = getRecipes()

    if (recipesList.findIndex((recipe) => recipe.id === recipeId) > -1) {
        initializeEditPage(recipeId)
    } else {
        throw Error('error. something happened')
    }
}



//If there is no recipe, redirect to home page.


console.log(recipeId)

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe')
const newIngredientElement = document.querySelector('#new-ingredient')


// const ingredientIds = recipe.ingredients.forEach((ingredient) => ingredient.id)

// renderIngredients(recipe)

const renderIngredients = () => {
    const recipe = recipesList.find((recipe) => recipe.id === recipeId)
    const ingredientEl = document.querySelector('#ingredients')
    ingredientEl.innerHTML = ''
    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
            ingredientEl.appendChild(generateIngredientDOM(ingredient))
        })
    }
    renderRecipes()
}




if (titleElement) {
    titleElement.addEventListener('input', (e) => {
        updateRecipe(recipeId, {
            title: e.target.value
        })
    })
}
if (bodyElement) {
    bodyElement.addEventListener('input', (e) => {
        updateRecipe(recipeId, {
            body: e.target.value
        })
    })
}

if (removeElement) {
    removeElement.addEventListener('click', (e) => {
        removeRecipe(recipeId)
        location.assign('/index.html')
    })
}


if (newIngredientElement) {
    newIngredientElement.addEventListener('submit', (e) => {
        const text = e.target.elements.text.value.trim()
        e.preventDefault()
        if (text.length > 0) {
            createIngredient(recipeId, text)
            renderIngredients()
            e.target.elements.text.value = ''
        }
    })
}



window.addEventListener('storage', (e) => {
    if (e.key === 'recipe') {
        initializeEditPage(recipeId)
    }
})
// // getRecipes().forEach((recipe) => )

export { renderIngredients } 