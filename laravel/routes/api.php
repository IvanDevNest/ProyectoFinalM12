<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Rutas para ReviewController
Route::apiResource('reviews', 'App\Http\Controllers\Api\ReviewController');

// Rutas para RouteController
Route::apiResource('routes', 'App\Http\Controllers\Api\RouteController');

// Rutas para MessageController
Route::apiResource('messages', 'App\Http\Controllers\Api\MessageController');

// Rutas para UsersController
// Route::apiResource('users', 'App\Http\Controllers\Api\UserController');

// // Rutas para RegisterController
// Route::post('register', 'App\Http\Controllers\Api\RegisterController@register');


Route::post('register', 'App\Http\Controllers\Api\TokenController@register');
Route::post('login', 'App\Http\Controllers\Api\TokenController@login');
Route::post('logout', 'App\Http\Controllers\Api\TokenController@logout');
// Route::get('user/{email}', 'App\Http\Controllers\Api\TokenController@user');
Route::get('users', 'App\Http\Controllers\Api\TokenController@index');
Route::get('user/{id}', 'App\Http\Controllers\Api\TokenController@show');



