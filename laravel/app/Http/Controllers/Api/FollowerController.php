<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Follower;

class FollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $followers = Follower::all();

        return response()->json([
            'success' => true,
            'data' => $followers
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
            'id_follower' => 'required|exists:users,id',
            'id_followed' => 'required|exists:users,id',
        ]);
        // Verificar si el usuario está tratando de seguirse a sí mismo
        if ($validatedData['id_follower'] == $validatedData['id_followed']) {
            return response()->json([
                'success' => false,
                'message' => 'No puedes seguirte a ti mismo'
            ], 400);
        }
        //comprovar si ya le sigue
        $existingFollow = Follower::where('id_follower', $validatedData['id_follower'])
            ->where('id_followed', $validatedData['id_followed'])
            ->first();
        if ($existingFollow) {
            return response()->json([
                'success' => false,
                'message' => 'Ya sigues a este usuario'
            ], 400);
        }
        $follower = Follower::create($validatedData);

        return response()->json([
            'success' => true,
            'data' => $follower,
            'message' => 'Follower created successfully.'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Follower $follower)
    {
        return response()->json([
            'success' => true,
            'data' => $follower
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //$id dejar de seguir
        $userId = auth()->user()->id;
        $unfollow = Follower::where('id_followed', $userId)->where('id_follower', $id)->first();

        if ($unfollow) {

            Follower::where('id_followed', $userId)->where('id_follower', $id)->delete();

        
            return response()->json([
                'success' => true,
                'message' => "deletd follow"
                // 'data' => $inscription
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => "follow not exists"
            ], 404);
        }
    }

    
}