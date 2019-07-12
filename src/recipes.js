
import uuidv4 from 'uuid/v4'

let recipes = []
//Read existing recipes from localStorage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}
//Save recipes to localStorage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes


const createRecipe = () => {
    const id = uuidv4()
    recipes.push({
        id,
        title: '',
        body: '',
        ingredients: [],
    })
    saveRecipes()
    return id
}


const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
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



export { updateRecipe, createRecipe, getRecipes, saveRecipes, removeRecipe, loadRecipes }