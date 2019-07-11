import { getFilters } from './filters'
import { getRecipes, saveRecipes, removeIngredient, loadRecipes } from './recipes'
import { renderIngredients } from './edit';

const statusMessage = (recipe) => {
    let availCount = 0
    const totalIngredients = recipe.ingredients.length
    recipe.ingredients.forEach((ingredient) => {
        if (ingredient.available === true) {
            availCount++
        }
    })
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
    console.log(getRecipes())
    const filteredRecipes = getRecipes().filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))


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
    console.log(getRecipes())
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)


    if (recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
            const ingredientElement = generateIngredientDOM(ingredient)
            ingredientsElement.appendChild(ingredientElement)

        })
    }
    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    renderIngredients()
}



// const generateIngredientDOM = (ingredient) => {
//     const ingredientEl = document.createElement("label")
//     const containerEl = document.createElement("div")
//     const checkbox = document.createElement("input")
//     const ingredientText = document.createElement("span")
//     const removeButton = document.createElement("button")

//     console.log('im an ingredient.')
//     // Setup ingredient checkbox
//     checkbox.setAttribute('type', 'checkbox')
//     checkbox.checked = ingredient.status
//     containerEl.appendChild(checkbox)
//     checkbox.addEventListener('change', () => {
//         if (ingredient.status) {
//             ingredient.status = !ingredient.status
//             saveRecipes()
//         }
//     })

//     // Setup the ingredient text
//     ingredientText.textContent = ingredient.text
//     containerEl.appendChild(ingredientText)

//     // Setup container
//     ingredientEl.classList.add('list-item')
//     containerEl.classList.add('list-item__container')
//     ingredientEl.appendChild(containerEl)

//     // Setup the remove button
//     removeButton.textContent = 'danger, remove button.'
//     removeButton.classList.add('button', 'button--text')
//     ingredientEl.appendChild(removeButton)
//     removeButton.addEventListener('click', () => {
//         removeIngredient(ingredient.id)
//         console.log('this is the remove button in action')
//     })

//     return ingredientEl
// }

const generateIngredientDOM = (ingredient) => {
    const ingredientEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const ingredientText = document.createElement("span")
    const removeButton = document.createElement("button")
    const recipeId = location.hash.substring(1)

    // Setup ingredient checkbox
    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)
    ingredient.status = checkbox.checked
    checkbox.addEventListener('change', () => {
        if (ingredient) {
            console.log(ingredient.status)
            ingredient.status = !ingredient.status
            console.log(ingredient.status)
            renderIngredients()
        }

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
























export { generateIngredientDOM, renderRecipes, generateRecipeDOM, initializeEditPage, statusMessage }