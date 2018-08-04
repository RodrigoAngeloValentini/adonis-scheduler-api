'use strict';

const { validate } = use('Validator');

class AuthController {
  async authenticate({ request, response, auth }) {
    try {
      const rules = {
        phone: 'required|string',
        password: 'required|string',
      };

      const data = request.only(['phone', 'password']);

      const validation = await validate(data, rules);

      if (validation.fails()) {
        return response.status(402).json(validation.messages());
      }

      const token = await auth
        .withRefreshToken()
        .attempt(data.phone, data.password);

      return response.json({ token: token });
    } catch (error) {
      console.log(error);
      return response.json({ error: error.name });
    }
  }
}

module.exports = AuthController;
