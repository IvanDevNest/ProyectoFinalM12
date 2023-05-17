<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Route;
use App\Models\Message;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Obtener todos los usuarios y rutas
       $users = User::all();
       $routes = Route::all();

       // Crear un mensaje aleatorio para cada ruta
       foreach ($routes as $route) {
           // Seleccionar un usuario aleatorio que sea distinto al usuario actual
           $user = $users->whereNotIn('id', [$route->user_id])->random();

           // Crear un mensaje para la ruta actual
           Message::create([
               'user_if' => $user->id,
               'route_id' => $route->id,
               'date' => now(),
               'text' => 'Este es un ejemplo de mensaje para la ruta ' . $route->name,
               'author_name'=>'joel'
           ]);
       }
    }
}
