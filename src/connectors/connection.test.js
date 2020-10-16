const connection = require('./connection');
const { Connection } = require('./connection');

describe('Connection works', () => {
  let connection;
  beforeEach(async () => {
    connection = await Connection.connect();
  });
  test('The async promise errors work', async () => {
    await expect(Connection.run('DELETE FROM wrong', [])).rejects.toThrowError(
      'SQLITE_ERROR: no such table: wrong'
    );
    await expect(Connection.all('SELECT * FROM wrong', [])).rejects.toThrowError(
      'SQLITE_ERROR: no such table: wrong'
    );
    await expect(Connection.get('SELECT * FROM wrong', [])).rejects.toThrowError(
      'SQLITE_ERROR: no such table: wrong'
    );
  });
  test('The connection is always the same one', async () => {
    expect(await Connection.connect()).toEqual(connection);
  });
});

describe('Transactions work', () => {
  afterEach(async () => {
    await Connection.resetDb();
  });
  test('Actions with no errors are committed', async () => {
    //when
    await Connection.inTransaction(async () => {
      await Connection.run(
        // eslint-disable-next-line max-len
        "INSERT INTO recipes (title,short_description,preparation_time) VALUES('SpagBol','Pasta and meat',90)"
      );
    });
    //then
    await expect(
      Connection.get('SELECT title FROM recipes WHERE title = $1', ['SpagBol'])
    ).resolves.toEqual({
      title: 'SpagBol',
    });
  });
  test('Actions with errors are rolled back', async () => {
    //when
    try {
      await Connection.inTransaction(async () => {
        await Connection.run(
          'INSERT INTO recipes(title, short_description,preparation_time) VALUES("SpagBol",null,"SpagBol",90)'
        );
        await Connection.run(
          'INSERT INTO recipes(title, short_description,preparation_time) VALUES("SpagBol",null,"SpagBol")'
        );
      });
    } catch (e) {}

    //then
    await expect(
      Connection.get('SELECT title FROM recipes WHERE title = $1', ['SpagBol'])
    ).resolves.toBeUndefined();
  });
});
