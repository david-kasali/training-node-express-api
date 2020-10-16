/* eslint-disable no-underscore-dangle */
/*
require('dotenv').config();
const request = require('supertest');
const winston = require('winston');
const { app } = require('../src/app');
const { Connection } = require('../src/connectors/connection');

const resetDb = async () => {
  await Connection.run('DELETE FROM recipe_ingredients', []);
  await Connection.run('DELETE FROM recipes', []);
  const sqlInsertRecipes = `INSERT INTO recipes (title, short_description, preparation_time) VALUES
        ('Banoffee Pie', 'An English dessert pie made from bananas, cream and caramel.', 25),
        ('Pizza Margherita', 'Pizza Margherita is a typical Neapolitan pizza, made with tomatoes, mozzarella cheese, fresh basil and olive oil.', 30);`;
  await Connection.run(sqlInsertRecipes, []);
  const sqlInsertRecipeIngredients = `INSERT INTO recipe_ingredients (recipe_id, ingredient_number, name) VALUES
        (1, 1, 'Flour.'),
        (1, 2, 'Eggs.');';
        (2, 1, 'Argue over whether to add pineapple.');`;
  await Connection.run(sqlInsertRecipeIngredients, []);
};

describe('HTTP requests to /recipe-ingredients', () => {
  beforeAll(async () => {
    winston.level = 'warning';
    await Connection.connect();
    await Connection.resetDb();
  });

  beforeEach(async () => {
    await resetDb();
  });

  test('A valid recipe ingredient can be saved and then retrieved and updated', async () => {
    const data = {
      recipe_id: 1,
      ingredient_number: 1,
      name: 'flour',
    };
    const postResponse = await request(app)
      .post('/recipes/1/recipe-ingredients')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(postResponse.status).toEqual(201);
    const { lastID, changes } = postResponse.body;
    expect(lastID).toBeGreaterThan(0);
    expect(changes).toEqual(1);

    const getResponse = await request(app)
      .get(`/recipes/1/recipe-ingredients/${lastID}/`)
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(getResponse.status).toEqual(200);
    expect(getResponse.body.name).toEqual('flour');

    const newData = {
      ingredient_number: 1,
      name: 'Flour.',
    };

    const putResponse = await request(app)
      .put(`/recipes/1/recipe-ingredients/${getResponse.body.recipe_ingredient_id}`)
      .send(newData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(putResponse.status).toEqual(200);
    expect(putResponse.body.changes).toEqual(1);

    const getResponse2 = await request(app)
      .get(`/recipes/1/recipe-inredients/${getResponse.body.recipe_ingredient_id}`)
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(getResponse2.status).toBe(200);
    expect(getResponse2.body.name).toEqual('flour');
  });

  test('Recipe ingredients for a recipe can retrieved and deleted', async () => {
    const getResponse = await request(app)
      .get(`/recipes/1/recipe-ingredients`)
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(getResponse.status).toEqual(200);
    expect(getResponse.body.length).toEqual(2);

    const deleteResponse = await request(app)
      .delete(`/recipes/1/recipe-ingredients/${getResponse.body[0].recipe_ingredient_id}`)
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.changes).toEqual(1);

    const getResponse2 = await request(app)
      .get('/recipes/1/recipe-ingredients')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(getResponse2.status).toEqual(200);
    expect(getResponse2.body.length).toEqual(1);
    expect(getResponse2.body[0].namet).toEqual('flour');
  });

  test('Exceptions are reported correctly', async () => {
    const newData = {
      recipe_id: 1,
      ingredient_number: 1,
      name: 'Flour.',
    };

    const putResponse = await request(app)
      .put(`/recipes/1/recipe-ingredients/1`)
      .send(newData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    expect(putResponse.status).toEqual(400);

    const getResponse2 = await request(app)
      .get('/recipes/1/recipe-ingredient/wrong')
      .send()
      .set('Accept', 'application/json');

    expect(getResponse2.status).toEqual(404);
  });

  afterAll(async () => {
    await Connection.db.close();
  });
});
*/
