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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Route::query();
    
        if ($name = $request->get('name')) {
            $query->where('name', 'like', "%{$name}%");
            $routes = $query->get();

        }
        if ($description = $request->get('description')) {
            $query->where('description', 'like', "%{$description}%");
            $routes = $query->get();

        }
        
        if ($type_vehicle = $request->get('type_vehicle')) {
            $query->where('type_vehicle', 'like', "%{$type_vehicle}%");
            $routes = $query->get();

        }
        
        else{
            $routes = $query->paginate(5);

        }
    
    
        return response()->json([
            'success' => true,
            'data' => $routes
        ], 200);
    }
    



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
            'url_maps' => 'required|max:255',
            'num_stops' => 'required|integer',
            'type_vehicle' => 'required|string',
            'max_users' => 'required|integer',
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
            'url_maps' => 'required|max:255',
            'num_stops' => 'required|integer',
            'type_vehicle' => 'required|string',
            'max_users' => 'required|integer',
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
    public function inscriptions()
    {
        $inscriptions = Inscription::all();

        return response()->json([
            'success' => true,
            'data' => $inscriptions
        ]);
    }
}