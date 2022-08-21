import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // 1. Getting id
    const id = window.location.hash.slice(1);

    // 2. Guard class
    if (!id) return;
    recipeView.renderSpinner();

    // 3. Loading recipe
    await model.loadRecipe(id); // await is important

    // 4. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
