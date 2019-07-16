
import "core-js/stable";
import "regenerator-runtime/runtime";
import { initializeEditPage } from './views'
import { updateRecipe, removeRecipe } from './recipes'
import { createIngredient } from './ingredients'
import { renderIngredients } from './edit-views'

const recipeId = location.hash.substring(1)
initializeEditPage(recipeId)

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe')
const newIngredientElement = document.querySelector('#new-ingredient')



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
    newIngredientElement.appendChild(removeElement)
}



window.addEventListener('storage', (e) => {
    if (e.key === 'recipe') {
        initializeEditPage(recipeId)
    }
})
// // getRecipes().forEach((recipe) => )

export { renderIngredients } 