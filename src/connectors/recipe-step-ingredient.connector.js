// This module enables retrieval and persistence of data via parametrised queries to the database

const { Connection } = require('./connection');

const createStepIngredient = async (StepIngredient) => {
  const sql = `INSERT INTO recipe_StepIngredient (recipe_id, ingredient_id, name, step_number, step_text) 
               VALUES ($1, $2, $3, $4, $5)`;
  return Connection.run(sql, [
    StepIngredient.recipe_id,
    StepIngredient.ingredient_id,
    StepIngredient.name,
    StepIngredient.step_number,
    StepIngredient.step_text,
  ]);
};

const deleteStepIngredient = async (id) => {
  const sql = `DELETE FROM recipe_StepIngredient 
               WHERE recipe_ingredient_id = $1`;
  return Connection.run(sql, [id]);
};

const getStepIngredients = async (recipeId) => {
  const sql = `SELECT recipe_ingredient_id, recipe_id, ingredient_id, name, step_number, step_text 
               FROM recipe_StepIngredient 
               WHERE recipe_id = $1
               ORDER BY ingredient_id`;
  return Connection.all(sql, [recipeId]);
};

const getStepIngredient = async (id) => {
  const sql = `SELECT recipe_ingredient_id, recipe_id, ingredient_id, name, step_number, step_text 
               FROM recipe_StepIngredient 
               WHERE recipe_ingredient_id = $1
               ORDER BY ingredient_id`;
  return Connection.get(sql, [id]);
};

const updateStepIngredient = async (id, recipeIngredient) => {
  const sql = `UPDATE recipe_StepIngredient
               SET step_number = $3, name = $2, ingredient_id =$1 , step_text = $4
               WHERE recipe_ingredient_id = $5`;
  return Connection.run(sql, [
    recipeIngredient.ingredient_id,
    recipeIngredient.name,
    recipeIngredient.step_number,
    recipeIngredient.step_text,
    id,
  ]);
};

module.exports = {
  createStepIngredient,
  deleteStepIngredient,
  getStepIngredients,
  getStepIngredient,
  updateStepIngredient,
};
