<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Route;
use App\Models\User;
use App\Models\Inscription;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RouteController extends Controller
{
      /**
     * Calcula la distancia entre dos puntos geográficos utilizando la fórmula haversine.
     *
     * @param  float  $lat1  Latitud del primer punto.
     * @param  float  $lon1  Longitud del primer punto.
     * @param  float  $lat2  Latitud del segundo punto.
     * @param  float  $lon2  Longitud del segundo punto.
     * @return float  Distancia entre los dos puntos en kilómetros.
     */
    private function calcularDistancia($lat1, $lon1, $lat2, $lon2)
    {
        $radioTierra = 6371; // Radio medio de la Tierra en kilómetros

        // Convertir las latitudes y longitudes a radianes
        $latRad1 = deg2rad($lat1);
        $lonRad1 = deg2rad($lon1);
        $latRad2 = deg2rad($lat2);
        $lonRad2 = deg2rad($lon2);

        // Diferencia de latitudes y longitudes
        $dLat = $latRad2 - $latRad1;
        $dLon = $lonRad2 - $lonRad1;

        // Fórmula de la distancia haversine
        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos($latRad1) * cos($latRad2) * sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        // Distancia en kilómetros
        $distancia = $radioTierra * $c;
        Log::debug($distancia);
        return $distancia;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Route::query();
        Log::debug($request);

        if ($name = $request->get('name')) {
            $query->where('name', 'like', "%{$name}%");
            // $routes = $query->paginate(5);


        }
        if ($description = $request->get('description')) {
            $query->where('description', 'like', "%{$description}%");
            // $routes = $query->paginate(5);


        }

        if ($type_vehicle = $request->get('type_vehicle')) {
            $query->where('type_vehicle', 'like', "%{$type_vehicle}%");
            // $routes = $query->paginate(5);

        }
        // } else {
        //     $routes = $query->paginate(5);

        // }
        

        // Calcular la distancia y agregarla a cada ruta
        
        $latitudeUser = $request->input('latitudeUser'); // Obtener la latitud del usuario desde la solicitud
        $longitudeUser = $request->input('longitudeUser'); // Obtener la longitud del usuario desde la solicitud
        // Obtener todas las rutas sin paginación
        $routes = $query->get();
        foreach ($routes as $route) {
            $distanceToRoute = $this->calcularDistancia($route->startLatitude, $route->startLongitude, $latitudeUser, $longitudeUser);
            $route->distanceToRoute = $distanceToRoute;
        }

        // Ordenar las rutas por distancia
        $routes = $routes->sortBy('distanceToRoute')->values();
        Log::debug($routes);
        $perPage = 5;
        $currentPage = $request->input('page', 1);
        $offset = ($currentPage - 1) * $perPage;
        // Obtener las rutas de la página actual
        $pagedRoutes = $routes->slice($offset, $perPage)->values();

        // Calcular el número de la última página
        $totalRoutes = $routes->count();
        $lastPage = ceil($totalRoutes / $perPage);

        return response()->json([
            'success' => true,
            'data' => $pagedRoutes,
            'current_page' => $currentPage,
            'per_page' => $perPage,
            'total' => $totalRoutes,
            'last_page' => $lastPage,
        ], 200);
    }

//last_page     


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'date' => 'required',
            'distance' => 'required|numeric',
            'estimated_duration' => 'required|numeric',
            // 'url_maps' => 'required|max:255',
            'num_stops' => 'required|integer',
            'type_vehicle' => 'required|string',
            'max_users' => 'required|integer',

            'startLatitude' => 'required',
            'startLongitude' => 'required',
            'endLatitude' => 'required',
            'endLongitude' => 'required',
            
            'id_route_style' => 'required|exists:route_styles,id',
            'author_id' => 'required|exists:users,id'
        ]);

        // Obtén el ID del usuario que creó la ruta
        $author_id = $validatedData['author_id'];

        // Validar si el usuario ya tiene una ruta asignada
        $user = User::find($author_id);
        if ($user->route_id != null) {
            return response()->json([
                'success' => false,
                'message' => 'User already has a route assigned.'
            ], 422);
        }

        $route = Route::create($validatedData);

        // Actualiza el registro del usuario correspondiente con la ID de la ruta creada
        User::where('id', $author_id)->update(['route_id' => $route->id]);

        $routeId = $route->id;
        Log::debug($routeId);
        //Crear inscripcion
        Inscription::create([
            'author_id' => $author_id,
            'route_id' => $routeId
        ]);

        return response()->json([
            'success' => true,
            'data' => $route,
            'message' => 'Route created successfully.'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Route $route)
    {
        return response()->json([
            'success' => true,
            'data' => $route
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Route $route)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required|max:255',
            'date' => 'required',
            'distance' => 'required|numeric',
            'estimated_duration' => 'required|numeric',
            // 'url_maps' => 'required|max:255',
            'num_stops' => 'required|integer',
            'type_vehicle' => 'required|string',
            'max_users' => 'required|integer',
            // 'latitude' => 'required|float',
            // 'longitude' => 'required|float',
            'startLatitude' => 'required',
            'startlongitude' => 'required',
            'endLatitude' => 'required',
            'endlongitude' => 'required',
            'id_route_style' => 'required|exists:route_styles,id',
            'author_id' => 'required|exists:users,id'
        ]);

        $route->update($validatedData);

        return response()->json([
            'success' => true,
            'data' => $route,
            'message' => 'Route updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Route $route)
    {
        $userId = $route->author_id;
        Log::debug($userId);
        User::where('id', $userId)->update(['route_id' => null]);


        $route->delete();

        return response()->json([
            'success' => true,
            'message' => 'Route deleted successfully.'
        ]);
    }

    /** 
     * Add inscription
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function inscription($id)
    {
        Log::debug($id);
        $user = auth()->user();
        // Validar si el usuario ya tiene una ruta asignada
        if ($user->route_id != null) {
            return response()->json([
                'success' => false,
                'message' => 'User already has a route assigned.'
            ], 422);
        }
        $userId = auth()->user()->id;

        $inscription = Inscription::create([
            'author_id' => $userId,
            'route_id' => $id
        ]);

        // Actualiza el registro del usuario correspondiente con la ID de la unida
        User::where('id', $userId)->update(['route_id' => $id]);

        return response()->json([
            'success' => true,
            'data' => $inscription
        ], 200);
    }

    /**
     * Undo inscription
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function uninscription($id)
    {
        $userId = auth()->user()->id;
        Log::debug($userId);
        $inscription = Inscription::where('author_id', $userId)->where('route_id', $id)->first();

        if ($inscription) {

            Inscription::where('author_id', $userId)->where('route_id', $id)->delete();

            // Actualiza el registro del usuario correspondiente con la ID de la unida
            User::where('id', $userId)->update(['route_id' => null]);

            return response()->json([
                'success' => true,
                'message' => "deletd inscription"
                // 'data' => $inscription
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => "inscription not exists"
            ], 404);
        }
    }
    public function inscriptions(Request $request)
    {
        $query = Inscription::query();

        if ($route_id = $request->get('route_id')) {
            $query->where('route_id', $route_id);
            $inscriptions = $query->get();
        }
        if ($author_id = $request->get('author_id')) {
            $query->where('author_id', $author_id);
            $inscriptions = $query->get();
        }
        return response()->json([
            'success' => true,
            'data' => $inscriptions
        ]);
    }
}