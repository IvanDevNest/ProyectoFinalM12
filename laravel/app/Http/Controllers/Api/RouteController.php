<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Route;
use Illuminate\Support\Facades\Log;

class RouteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $routes = Route::all();

        return response()->json([
            'success' => true,
            'data' => $routes
        ]);
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
            'start_time' => 'required|numeric',
            'distance' => 'required|numeric',
            'estimated_duration' => 'required|numeric',
            'URL_maps' => 'required|max:255',
            'num_stops' => 'required|integer',
            'type_vehicle' => 'required|string',
            'max_users' => 'required|integer',
            'id_route_style' => 'required|exists:route_styles,id'
        ]);

        $route = Route::create($validatedData);

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
            'timetable' => 'required|max:255',
            'cord_x' => 'required|numeric',
            'cord_y' => 'required|numeric',
            'URL_maps' => 'required|max:255',
            'num_stops' => 'required|integer',
            'max_users' => 'required|integer',
            'id_user' => 'required|exists:users,id',
            'id_route_style' => 'required|exists:route_styles,id'
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
        $route->delete();

        return response()->json([
            'success' => true,
            'message' => 'Route deleted successfully.'
        ]);
    }
    public function inscribirseRuta(Request $request,$id) 
    {
        Log::debug($request);
        // Validar datos del usuario
        $usuario = $request->user();
        $usuario_id = $usuario->id;
    
        // Validar datos de la ruta
        
        $ruta = Route::find($id);
        if (!$ruta) {
            return response()->json([
                "success" => false,
                "message" => "La ruta no existe"
            ], 404);
        }
    
        // Actualizar campo id_route del usuario
        $usuario->id_route = $id;
        $usuario->save();
    
        return response()->json([
            "success" => true,
            "message" => "Usuario inscrito en la ruta",
        ]);
    }    
}

