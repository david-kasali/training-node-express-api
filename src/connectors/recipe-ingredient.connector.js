// This module enables retrieval and persistence of data via parametrised queries to the database

const { Connection } = require('./connection');

const createRecipeIngredient = async (recipeIngredient) => {
  const sql = `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, name) 
               VALUES ($1, $2, $3)`;
  return Connection.run(sql, [
    recipeIngredient.recipe_id,
    recipeIngredient.ingredient_id,
    recipeIngredient.name,
  ]);
};

const deleteRecipeIngredient = async (id) => {
  const sql = `DELETE FROM recipe_ingredient 
               WHERE recipe_ingredient_id = $1`;
  return Connection.run(sql, [id]);
};

const getRecipeIngredients = async (recipeId) => {
  const sql = `SELECT recipe_ingredient_id, recipe_id, ingredient_id, name 
               FROM recipe_ingredient 
               WHERE recipe_id = $1
               ORDER BY ingredient_id`;
  return Connection.all(sql, [recipeId]);
};

const getRecipeIngredient = async (id) => {
  const sql = `SELECT recipe_ingredient_id, recipe_id, ingredient_id, name 
               FROM recipe_ingredient 
               WHERE recipe_ingredient_id = $1
               ORDER BY ingredient_id`;
  return Connection.get(sql, [id]);
};

const updateRecipeIngredient = async (id, recipeIngredient) => {
  const sql = `UPDATE recipe_ingredient
               SET step_number = $1, name = $2
               WHERE recipe_ingredient_id = $3`;
  return Connection.run(sql, [recipeIngredient.ingredient_id, recipeIngredient.name, id]);
};

module.exports = {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getRecipeIngredients,
  getRecipeIngredient,
  updateRecipeIngredient,
};
