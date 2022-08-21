import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // 1. Get data from API
    const data = await getJSON(`${API_URL}/${id}`);

    // 2. Changing state
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (error) {
    // temp error handling
    console.error(`${error} 💥💥💥`);
  }
};
