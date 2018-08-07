'use strict';

const { validate } = use('Validator');
const User = use('App/Models/User');

class AuthController {
  async authenticate({ request, response, auth }) {
    const rules = {
      phone: 'required|string',
      password: 'required|string',
    };

    const data = request.only(['phone', 'password']);

    const validation = await validate(data, rules);

    if (validation.fails()) {
      return response.status(422).json({ error: validation.messages() });
    }

    const authResult = await auth
      .withRefreshToken()
      .attempt(data.phone, data.password);

    return response.json({
      token: authResult.token,
      refreshToken: authResult.refreshToken,
    });
  }
}

module.exports = AuthController;
