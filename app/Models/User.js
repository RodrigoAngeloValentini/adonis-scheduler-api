'use strict';

const Model = use('Model');
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */

  static get hidden() {
    return ['password'];
  }

  static get visible() {
    return ['phone', 'name'];
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  todos() {
    return this.hasMany('App/Models/Todo');
  }
}

module.exports = User;
