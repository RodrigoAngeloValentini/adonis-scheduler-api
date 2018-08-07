'use strict';

const User = use('App/Models/User');

const { validate } = use('Validator');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request, response }) {
    try {
      const rules = {
        phone: 'required|string|max:250',
        name: 'required|string|max:80',
        password: 'required|string|max:60|min:6',
      };

      const data = request.only(['phone', 'name', 'password']);

      const validation = await validate(data, rules);

      if (validation.fails()) {
        return response.status(422).json({ error: validation.messages() });
      }

      const user = new User();
      user.name = data.name;
      user.phone = data.phone;
      user.password = data.password;

      await user.save();

      return response.status(201).json(user);
    } catch (error) {
      console.log(error);
      return response.json({ error: error.name });
    }
  }

  async findByPhone({ params, request, response }) {
    try {
      const user = await User.findBy('phone', params.phone);
      if (!user) {
        return response.status(200).json({ status: false });
      }
      return response.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      return response.json({ error: error.name });
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update({ params, request, response }) {
    try {
      const rules = {
        name: 'string|max:80',
        password: 'string|max:60|min:6',
      };

      const data = request.only(['name', 'password']);

      const validation = await validate(data, rules);

      if (validation.fails()) {
        return response.status(422).json({ error: validation.messages() });
      }

      const user = await User.find(params.id);
      if (!user) {
        return response.status(404).json({ data: 'User not found' });
      }

      user.name = data.name;

      if (data.name) {
        user.name = data.name;
      }

      if (data.password) {
        user.password = data.password;
      }

      await user.save();
      return response.status(200).json(user);
    } catch (error) {
      console.log(error);
      return response.json({ error: error.name });
    }
  }
}

module.exports = UserController;
