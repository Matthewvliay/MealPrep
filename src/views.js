
import { getFilters } from './filters'
import { getRecipes, saveRecipes, createRecipe } from './recipes'
import { renderIngredients } from './edit-views'
import { generateIngredientDOM, updateIngredient } from './ingredients'
console.log(getRecipes())
const statusMessage = (recipe) => {
    let availCount = 0
    const totalIngredients = recipe.ingredients.length
    recipe.ingredients.forEach((ingredient) => {
        if (ingredient.status === true) {
            availCount++
            console.log(availCount)
        }
    })
    console.log(availCount)
    let msg = ''
    if (totalIngredients === 0) {
        msg = 'please add ingredients'
    } else if (availCount === 0) {
        msg = `No ingredients available (${availCount} / ${totalIngredients})`
    } else if (availCount < totalIngredients) {
        msg = `Some ingredients available (${availCount} / ${totalIngredients})`
    } else {
        msg = `All ingredients available (${availCount} / ${totalIngredients})`
    }
    saveRecipes()
    return msg
}

//Generate the RECIPE DOM for each recipe.
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Set up recipe title text

    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unamed recipe.'
    }
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    // Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = statusMessage(recipe)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)



    return recipeEl
}

//render the application recipes
const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = getRecipes()
    console.log(recipes)
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))


    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            console.log(recipe)
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#recipe-title')
    const bodyElement = document.querySelector('#recipe-body')
    const ingredientsElement = document.querySelector('#ingredients')
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)


    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
            const ingredientElement = generateIngredientDOM(ingredient)
            ingredientsElement.appendChild(ingredientElement)

        })
    }
    titleElement.value = recipe.title
    bodyElement.value = recipe.body
}

export { renderRecipes, generateRecipeDOM, initializeEditPage, statusMessage }