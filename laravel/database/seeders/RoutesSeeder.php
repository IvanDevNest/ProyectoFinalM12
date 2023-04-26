<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class RoutesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Obtener los IDs de los usuarios y los estilos de ruta existentes
        $userIds = DB::table('users')->pluck('id')->toArray();
        $routeStyleIds = DB::table('route_styles')->pluck('id')->toArray();

        // Generar algunos datos aleatorios para la tabla "routes"
        $routes = [];
        for ($i = 0; $i < 10; $i++) {
            $routes[] = [
                'name' => 'Route ' . ($i + 1),
                'timetable' => '9:00 AM - 5:00 PM',
                'cord_x' => rand(1, 100),
                'cord_y' => rand(1, 100),
                'URL_maps' => 'https://maps.google.com/route' . ($i + 1),
                'num_stops' => rand(1, 10),
                'max_users' => rand(10, 50),
                'id_user' => $userIds[array_rand($userIds)],
                'id_route_style' => $routeStyleIds[array_rand($routeStyleIds)],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insertar los datos en la tabla "routes"
        DB::table('routes')->insert($routes);
    
    }
}
