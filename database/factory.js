'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory');
const Hash = use('Hash');

Factory.blueprint('App/Models/User', async faker => {
  return {
    phone: '49984174214',
    name: faker.username(),
    password: await Hash.make('123456'),
  };
});

Factory.blueprint('App/Models/Todo', faker => {
  return {
    title: faker.word(),
    description: faker.sentence({ words: 5 }),
    datetime: faker.date({ year: 2018 }),
  };
});
