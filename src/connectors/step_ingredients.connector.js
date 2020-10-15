const { Connection } = require('./connection');

const createStepIngredient = async (stepIngredient) => {
  const sql = `INSERT INTO step_ingredients (recipe_step_id, recipe_ingredient_id) 
               VALUES ($1, $2)`;
  return Connection.run(sql, [stepIngredient.recipe_step_id, stepIngredient.ingredient_id]);
};

const deleteStepIngredient = async (id) => {
  const sql = `DELETE FROM step_ingredients 
               WHERE recipe_ingredient_id = $1`;
  return Connection.run(sql, [id]);
};

const getStepIngredients = async (stepIngredientId) => {
  const sql = `SELECT step_ingredients.recipe_ingredient_id, recipe_ingredients.name
               FROM recipe_ingredients 
               INNER JOIN step_ingredients ON recipe_ingredients.recipe_ingredient_id = step_ingredients.recipe_ingredient_id
               WHERE step_ingredients.recipe_step_id = $1
               ORDER BY step_ingredients.recipe_ingredient_id`;
  return Connection.all(sql, [stepIngredientId]);
};

const getStepIngredient = async (id) => {
  const sql = `SELECT recipe_ingredients.name 
               FROM recipe_ingredients 
               INNER JOIN step_ingredients ON recipe_ingredients.recipe_ingredient_id = step_ingredients.recipe_ingredient_id
               WHERE step_ingredients.recipe_ingredient_id = $1
               ORDER BY step_ingredients.recipe_ingredient_id`;
  return Connection.get(sql, [id]);
};

const updateStepIngredient = async (id, stepIngredient) => {
  const sql = `UPDATE recipe_ingredients
               SET recipe_ingredient_id = $1
               WHERE recipe_step_id = $2`;
  return Connection.run(sql, [stepIngredient.recipe_ingredient_id, id]);
};

module.exports = {
  createStepIngredient,
  deleteStepIngredient,
  getStepIngredients,
  getStepIngredient,
  updateStepIngredient,
};
