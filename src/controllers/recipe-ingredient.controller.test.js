jest.mock('../connectors/recipe-ingredient.connector.js');
const {
  getRecipeIngredients,
  deleteRecipeIngredient,
  updateRecipeIngredient,
  createRecipeIngredient,
} = require('../connectors/recipe-ingredient.connector.js');

getRecipeIngredients.mockReturnValue(
  Promise.resolve([
    {
      recipe_ingredient_id: 11,
      ingredient_id: 1,
      recipe_id: 1,
      name: 'flour',
    },
    {
      recipe_ingredient_id: 12,
      ingredient_id: 1,
      recipe_id: 2,
      name: 'eggs',
    },
  ])
);
deleteRecipeIngredient.mockReturnValue(Promise.resolve({ changes: 1 }));
updateRecipeIngredient.mockReturnValue(Promise.resolve({ changes: 1 }));
createRecipeIngredient.mockReturnValue(Promise.resolve({ changes: 1 }));
const { updateRecipeIngredients } = require('./recipe-ingredient.controller');

afterEach(() => {
  jest.clearAllMocks();
});

describe('update recipe ingredients collection', () => {
  test('The correct number of changes is returned', async () => {
    const result = await updateRecipeIngredients(1, [
      {
        recipe_ingredient_id: 11,
        recipe_id: 1,
        ingredient_id: 1,
        name: 'flour',
      },
      {
        recipe_ingredient_id: null,
        recipe_id: 1,
        ingredient_id: 2,
        name: 'eggs',
      },
    ]);
    expect(result.changes).toEqual(3);
  });
});
