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
    public function destroy(Follower $follower)
    {
        $follower->delete();

        return response()->json([
            'success' => true,
            'message' => 'Follower deleted successfully.'
        ]);

    }
}
