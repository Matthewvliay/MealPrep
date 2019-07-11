import uuidv4 from 'uuid/v4'
import { renderIngredients } from './edit';


let recipes = []

//Read existing recipes from localStorage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        recipes = recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        recipes = []
    }
}
//Save recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes
console.log(getRecipes())


const createRecipe = () => {
    const id = uuidv4()
    const ingredientId = uuidv4()

    recipes.push({
        id,
        title: '',
        body: '',
        ingredients: [],
    })
    saveRecipes()
    return id
}

const createIngredient = (recipeId, text) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
    const ingredientId = uuidv4()
    recipe.ingredients.push({
        id: ingredientId,
        text,
        status: false,
    })
    saveRecipes()
    return ingredientId
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}



const removeIngredient = (recipeId, ingredientId) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredientId)
    console.log(ingredientIndex)
    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
        saveRecipes()
        renderIngredients()
    }
}
// Toggle the status value for a given ingredient
const toggleIngredient = (recipeId, ingredientId) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
    const ingredient = recipe.ingredients.find((ingredient) => ingredient.id === ingredientId)
    if (ingredient) {
        ingredient.status = !ingredient.status
        saveRecipes()
        renderIngredients()
    }
}

const updateRecipe = (recipeId, updates) => {
    const recipe = getRecipes().find((recipe) => recipe.id === recipeId)
    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title

    }

    if (typeof updates.body === 'string') {
        recipe.body = updates.body

    }

    saveRecipes()
    return recipe
}

recipes = loadRecipes()
loadRecipes()


export { toggleIngredient, createIngredient, updateRecipe, createRecipe, getRecipes, saveRecipes, removeRecipe, removeIngredient, loadRecipes }