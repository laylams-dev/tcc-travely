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

Route.post('/bedConfig', 'RoomConfigsController.create').middleware('AdminAuth')
Route.get('/bedConfigs', 'RoomConfigsController.index').middleware('AdminAuth')
Route.patch('/bedConfig/:id', 'RoomConfigsController.update').middleware('AdminAuth')
Route.get('/bedConfig/:id', 'RoomConfigsController.show').middleware('AdminAuth')

Route.post('/roomModel', 'RoomModelsController.create').middleware('AdminAuth')
Route.get('/roomModelsAdmin', 'RoomModelsController.indexAdmin').middleware('AdminAuth')
Route.get('/roomModels', 'RoomModelsController.index')
Route.get('/roomModel/:id', 'RoomModelsController.show')
Route.patch('/roomModel/:id/toggleActive', 'RoomModelsController.toggleRoomActive').middleware(
  'AdminAuth'
)
Route.patch('/roomModel/:id', 'RoomModelsController.update').middleware('AdminAuth')

Route.post('/roomModelConfig', 'RoomModelConfigsController.create').middleware('AdminAuth')
Route.get('/roomModelConfigs', 'RoomModelConfigsController.index')
Route.get('/roomModelConfig/:id', 'RoomModelConfigsController.show')
Route.patch('/roomModelConfig/:id', 'RoomModelConfigsController.update').middleware('AdminAuth')
Route.get('/roomModels/checkRoomDisponibility', 'RoomModelsController.getRoomsByModel')

Route.post('/room', 'RoomsController.create').middleware('AdminAuth')
Route.get('/rooms', 'RoomsController.index')
Route.get('/room/:id', 'RoomsController.show')
Route.patch('/room/:id', 'RoomsController.update').middleware('AdminAuth')
Route.delete('/room/:id', 'RoomsController.delete').middleware('AdminAuth')

Route.get('/reservations', 'ReservationsController.index').middleware('AdminAuth')
Route.get('/clientReservations', 'ReservationsController.getClientReservations')
Route.post('/reservation', 'ReservationsController.create')
Route.patch('/updateStatus/:id', 'ReservationsController.updateStatus')
