<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Follower;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FollowersSeeder extends Seeder
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

        // Crear seguidores aleatorios para cada usuario
        foreach ($users as $user) {
            // Seleccionar 5 usuarios aleatorios que no sean el usuario actual
            $followed_users = $users->whereNotIn('id', [$user->id])->random(5);

            // Seguir a cada usuario seleccionado
            foreach ($followed_users as $followed_user) {
                Follower::create([
                    'id_follower' => $user->id,
                    'id_followed' => $followed_user->id,
                ]);
            }
        }
    }
}
