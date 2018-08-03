'use strict';

const Schema = use('Schema');

class TodoSchema extends Schema {
  up() {
    this.create('todos', table => {
      table.increments();
      table.string('title', 80).notNullable();
      table.string('description', 254).notNullable();
      table.dateTime('datetime').notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.timestamps();
    });
  }

  down() {
    this.drop('todos');
  }
}

module.exports = TodoSchema;
