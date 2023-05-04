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
                'description' => 'Route de pruebaa',
                'start_time' => '10:30',
                'estimated_duration' => '1:30',
                'distance' => '50',

                'type_vehicle' => 'moto',
                'URL_maps' => 'https://maps.google.com/route' . ($i + 1),
                'num_stops' => rand(1, 10),
                'max_users' => rand(1, 10),
                'id_route_style' => $routeStyleIds[array_rand($routeStyleIds)],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insertar los datos en la tabla "routes"
        DB::table('routes')->insert($routes);
    
    }
}
