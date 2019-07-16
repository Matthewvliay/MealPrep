
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createRecipe } from './recipes'
import { renderRecipes } from "./views";

renderRecipes()
document.querySelector('#create-recipe').addEventListener('click', (e) => {

    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
    renderRecipes()
    console.log(id)
})
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})


window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
})
