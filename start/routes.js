'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' };
});

Route.group(() => {
  Route.get('/todo', 'TodoController.index');
  Route.get('/todo/:id', 'TodoController.show');
  Route.post('/todo', 'TodoController.store');
  Route.delete('/todo/:id', 'TodoController.destroy');
}).prefix('api');
