'use strict';

const Todo = use('App/Models/Todo');
const User = use('App/Models/User');
const { validate } = use('Validator');
/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   */
  async index({ request, response, view }) {
    const todos = await Todo.all();
    return response.json(todos);
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
  async store({ request, response }) {
    try {
      const rules = {
        title: 'required|max:80',
        description: 'required|max:250',
        datetime: 'required|date',
      };

      const data = request.only(['title', 'description', 'datetime']);

      const validation = await validate(data, rules);

      if (validation.fails()) {
        return response.status(402).json(validation.messages());
      }

      const user = await User.first();

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
