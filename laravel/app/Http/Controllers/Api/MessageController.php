<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = Message::all();
        return response()->json([
            'success' => true,
            'data' => $messages
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
            'id_user' => 'required|exists:users,id',
            'id_route' => 'required|exists:routes,id',
            'date' => 'required|date_format:Y-m-d H:i:s',
            'text' => 'required|string|max:255',
            'attached_file' => 'nullable|file'
        ]);

        $message = new Message($validatedData);
        $message->save();

        return response()->json([
            'success' => true,
            'data' => $message,
            'message' => 'Message created successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $message = Message::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $message
        ]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $validatedData = $request->validate([
            'id_user' => 'sometimes|required|exists:users,id',
            'id_route' => 'sometimes|required|exists:routes,id',
            'date' => 'sometimes|required|date_format:Y-m-d H:i:s',
            'text' => 'sometimes|required|string|max:255',
            'attached_file' => 'nullable|file'
        ]);
    
        $message = Message::findOrFail($id);
    
        $message->update($validatedData);
    
        return response()->json([
            'success' => true,
            'data' => $message,
            'message' => 'Message updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();
        return response()->json([
            'success' => true,
            'message' => 'Message deleted successfully.'
        ]);
    }
}
