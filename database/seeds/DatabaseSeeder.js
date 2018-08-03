'use strict';

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory');

class DatabaseSeeder {
  async run() {
    const user = await Factory.model('App/Models/User').create();

    const todo1 = await Factory.model('App/Models/Todo').make();
    const todo2 = await Factory.model('App/Models/Todo').make();
    const todo3 = await Factory.model('App/Models/Todo').make();
    const todo4 = await Factory.model('App/Models/Todo').make();
    const todo5 = await Factory.model('App/Models/Todo').make();

    await user.todos().save(todo1);
    await user.todos().save(todo2);
    await user.todos().save(todo3);
    await user.todos().save(todo4);
    await user.todos().save(todo5);
  }
}

module.exports = DatabaseSeeder;
