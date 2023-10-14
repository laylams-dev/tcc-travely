/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.login')
Route.get('/auth', 'AuthController.chechIfIsLogged')
Route.post('/logout', 'AuthController.logout')

Route.post('/user', 'UsersController.create')

Route.get('/rooms/:id', 'RoomsController.show')
Route.get('/rooms', 'RoomsController.index')
Route.post('/room', 'RoomsController.create')

Route.get('/bedConfigs', 'RoomConfigsController.index').middleware('AdminAuth')
Route.post('/bedConfig', 'RoomConfigsController.create').middleware('AdminAuth')
Route.patch('/bedConfig/:id', 'RoomConfigsController.update').middleware('AdminAuth')
Route.get('/bedConfig/:id', 'RoomConfigsController.show').middleware('AdminAuth')
