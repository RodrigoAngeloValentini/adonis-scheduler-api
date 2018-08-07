'use strict';

const Todo = use('App/Models/Todo');
const User = use('App/Models/User');
const Database = use('Database');
const { validate } = use('Validator');
/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   */
  async index({ response, auth }) {
    const authUser = await auth.getUser();

    const todos = await Todo.query()
      .where({ user_id: authUser.id })
      .fetch();

    return response.json(todos);
  }

  async getByDate({ params, response, auth }) {
    const authUser = await auth.getUser();

    const date = params.date;

    // select title, description, datetime from todos where user_id = 18 and datetime::date = '2018-08-03'

    const todos = await Database.raw(
      'select id, title, description, datetime from todos where user_id = ? and datetime::date = ?',
      [authUser.id, date],
    );

    // const todos = await Todo.query()
    //   .where({ user_id: authUser.id })
    //   .where({ datetime: '2018-08-03 12:30:00-03' })
    //   .fetch();

    return response.json(todos.rows);
  }

  /**
   * Display a single todo.
   * GET todos/:id
   */
  async show({ params, request, response, view }) {
    const todo = await Todo.find(params.id);

    if (!todo) {
      return response.status(404).json({ data: 'Todo not found' });
    }

    return response.json(todo);
  }

  /**
   * Create/save a new todo.
   * POST todos
   */
  async store({ request, response, auth }) {
    try {
      const rules = {
        title: 'required|string|max:80',
        description: 'required|string|max:250',
        datetime: 'required|date',
      };

      const data = request.only(['title', 'description', 'datetime']);

      const validation = await validate(data, rules);

      if (validation.fails()) {
        return response.status(422).json({ error: validation.messages() });
      }

      const authUser = await auth.getUser();
      const user = await User.find(authUser.id);

      const todo = new Todo();
      todo.title = data.title;
      todo.description = data.description;
      todo.datetime = data.datetime;

      await user.todos().save(todo);

      return response.status(201).json(todo);
    } catch (error) {
      console.log(error);
      return response.json({ error: error.name });
    }
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   */
  async destroy({ params, request, response }) {
    const todo = await Todo.find(params.id);
    if (!todo) {
      return response.status(404).json({ data: 'Todo not found' });
    }
    await todo.delete();

    return response.status(204).json(null);
  }
}

module.exports = TodoController;
