<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // Obtener todos los usuarios
      $users = User::all();

      // Crear una review aleatoria para cada usuario
      foreach ($users as $user) {
          // Seleccionar un usuario aleatorio que no sea el usuario actual
          $reviewed_user = $users->whereNotIn('id', [$user->id])->random();

          // Crear una review para el usuario actual
          Review::create([
              'id_reviewed' => $reviewed_user->id,
              'id_author' => $user->id,
              'score' => rand(1, 5),
          ]);
      }
    }
}
