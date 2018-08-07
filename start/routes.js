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
  Route.get('/todo', 'TodoController.index').middleware('auth');
  Route.get('/todo/:id', 'TodoController.show').middleware('auth');
  Route.get('/todo/get-by-date/:date', 'TodoController.getByDate').middleware(
    'auth',
  );
  Route.post('/todo', 'TodoController.store').middleware('auth');
  Route.delete('/todo/:id', 'TodoController.destroy').middleware('auth');

  Route.get('/user/phone-verify/:phone', 'UserController.findByPhone');
  Route.post('/user', 'UserController.store');
  Route.put('/user/:id', 'UserController.update').middleware('auth');

  Route.post('/auth/authenticate', 'AuthController.authenticate');
}).prefix('api');
