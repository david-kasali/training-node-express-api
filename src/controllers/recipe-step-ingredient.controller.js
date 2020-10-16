const { getStepIngredients, createStepIngredient } = require('../connectors/recipe-step-ingredient.connector');
const StepIngredientConnector = require('../connectors/recipe-step-ingredient.connector');
const { BadRequestException } = require('../utils/errors');

const createStepIngredient = async (recipeId, StepIngredient) =>
  // eslint-disable-next-line max-len
  recipeStepIngredientConnector.createRecipeStepIngredient({ recipe_id: recipeId, ...StepIngredient });

// eslint-disable-next-line max-len
const deleteStepIngredient = async (id) => StepIngredientConnector.deleteStepIngredient(id);

const getStepsIngredients = async (recipeId) => StepIngredientConnector.getStepsIngredients(recipeId);

const getStepIngredient = async (id) => StepIngredientConnector.getStepIngredient(id);

/*const updateStepIngredient = async (id, StepIngredient) => {
  if (StepIngredient.recipe_id && StepIngredient.recipe_id !== id) {
    throw new BadRequestException('Cannot change recipe for recipe step');
  }
  return StepIngredientConnector.updateRecipeStep(id, StepIngredient);
}; */

// Updates the current recipe steps using the supplied array
// Steps that no longer exist are deleted, existing ones are upadted and new ones created
// TODO: Renumber recipe steps upon update
const updateStepsIngredients = async (stepId, submittedStepsIngredients) => {

  const currentStepsIngredients = await getStepIngredients(stepId)
    
  const stepsIngredientsToDelete = currentStepsIngredients.filter(
      // eslint-disable-next-line max-len
      (stepIngredient) => !submittedStepsIngredients.some((item) =>stepIngredient.recipe_ingredient_id && item.recipe_step_id === stepIngredient.recipe_step_id)
  );

  // eslint-disable-next-line max-len
  const promisesDelete = stepsIngredientsToDelete.map((stepIngredient) => deleteStepIngredient(stepIngredient.recipe_ingredient_id));

  // eslint-disable-next-line max-len
  const stepIngredientsToAdd = submittedStepIngredients.filter((stepIngredient) => !currentStepsIngredients.some((item) => item.recipe_step_id === stepIngredient.recipe_ingredient_id && item.recipe_step_id === stepIngredient.recipe_step_id)

  )

  const promiseAdd = StepIngredientToAdd.map((stepIngredient) =>
      createStepIngredient(StepIngredient.recipe_step_id, stepIngredient.recipe_ingredient_id)
  );


  try {
      // eslint-disable-next-line max-len
      const changes = (await Promise.all(promisesDelete.concat(promisesAdd))).reduce(
          prev,curr) => prev + curr.changes, 0);
      return { changes, currentSteps: submittedSteps };
}     catch (e) {
          return { error: e };
      }
};

module.exports = {
  createRecipeStep,
  deleteRecipeStep,
  getRecipeSteps,
  getRecipeStep,
  updateRecipeStep,
  updateRecipeSteps,
};
