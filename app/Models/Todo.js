'use strict';

const Model = use('Model');

class Todo extends Model {
  static get primaryKey() {
    return 'id';
  }

  static get visible() {
    return ['id', 'title', 'description', 'datetime'];
  }

  static get dates() {
    return super.dates.concat(['datetime']);
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }
}

module.exports = Todo;
