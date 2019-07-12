import { getRecipes, saveRecipes, loadRecipes } from './recipes'
import { renderIngredients } from './edit-views'
import uuidv4 from 'uuid/v4'


const generateIngredientDOM = (ingredient) => {
    const ingredientEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const ingredientText = document.createElement("span")
    const removeButton = document.createElement("button")
    const recipeId = location.hash.substring(1)

    // Setup ingredient checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.status
    containerEl.appendChild(checkbox)

    checkbox.addEventListener('change', () => {
        toggleIngredient(recipeId, ingredient.id)
        console.log(ingredient.status)
    })
    // Setup the ingredient text
    ingredientText.textContent = ingredient.text
    containerEl.appendChild(ingredientText)

    // Setup container
    ingredientEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'danger, remove button.'
    removeButton.classList.add('button', 'button--text')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(recipeId, ingredient.id)
        renderIngredients()
    })


    return ingredientEl
}

const createIngredient = (recipeId, text) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
    const ingredientId = uuidv4()
    recipe.ingredients.push({
        id: ingredientId,
        text,
        status: false,
    })
    return ingredientId
}

const removeIngredient = (recipeId, ingredientId) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredientId)
    console.log(ingredientIndex)
    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    }
}

const toggleIngredient = (recipeId, ingredientId) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
    const ingredient = recipe.ingredients.find((ingredient) => ingredient.id === ingredientId)

    if (ingredient) {
        ingredient.status = !ingredient.status
        saveRecipes()
    }
}

export { generateIngredientDOM, createIngredient, }