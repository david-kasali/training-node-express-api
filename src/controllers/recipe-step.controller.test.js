jest.mock('../connectors/recipe-step.connector.js');
const {
  getRecipeSteps,
  deleteRecipeStep,
  updateRecipeStep,
  createRecipeStep,
} = require('../connectors/recipe-step.connector.js');

getRecipeSteps.mockReturnValue(
  Promise.resolve([
    {
      recipe_step_id: 11,
      recipe_id: 1,
      step_number: 1,
      step_text: 'step one',
    },
    {
      recipe_step_id: 12,
      recipe_id: 1,
      step_number: 2,
      step_text: 'step two',
    },
  ])
);
deleteRecipeStep.mockReturnValue(Promise.resolve({ changes: 1 }));
updateRecipeStep.mockReturnValue(Promise.resolve({ changes: 1 }));
createRecipeStep.mockReturnValue(Promise.resolve({ changes: 1 }));
const { updateRecipeSteps } = require('./recipe-step.controller');

afterEach(() => {
  jest.clearAllMocks();
});

describe('update recipe steps collection', () => {
  test('The correct number of changes is returned', async () => {
    const result = await updateRecipeSteps(1, [
      {
        recipe_step_id: 11,
        recipe_id: 1,
        step_number: 1,
        step_text: 'step one',
      },
      {
        recipe_step_id: null,
        recipe_id: 1,
        step_number: 2,
        step_text: 'new step two',
      },
    ]);
    expect(result.changes).toEqual(3);
  });

  test('Step numbers are made sequential upon save', async () => {
    //given
    const newSteps = [
      {
        recipe_step_id: 11,
        recipe_id: 1,
        step_number: 1,
        step_text: 'step one',
      },
      {
        recipe_step_id: null,
        recipe_id: 1,
        step_number: 3,
        step_text: 'new step two',
      },
    ];
    //when
    const result = await updateRecipeSteps(1, newSteps);
    //then
    expect(result.currentSteps.map((step) => step.step_number)).toEqual([1, 2]);
  });

  test('Step numbers are made sequential upon save', async () => {
    //given
    const newSteps = [
      {
        recipe_step_id: 11,
        recipe_id: 1,
        step_number: 2,
        step_text: 'step one',
      },
      {
        recipe_step_id: null,
        recipe_id: 1,
        step_number: 3,
        step_text: 'new step two',
      },
    ];
    //when
    const result = await updateRecipeSteps(1, newSteps);
    //then
    expect(result.currentSteps.map((step) => step.step_number)).toEqual([1, 2]);
  });
});
