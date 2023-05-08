<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\File;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data'    => File::all()
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
        // Validar fitxer
        $validatedData = $request->validate([
            'upload' => 'required|mimes:gif,jpeg,jpg,png|max:2048'
        ]);

        // Desar fitxer al disc i inserir dades a BD
        $upload = $request->file('upload');
        $file = new File();
        $ok = $file->diskSave($upload);

        if ($ok) {
            return response()->json([
                'success' => true,
                'data'    => $file
            ], 201);
        } else {
            return response()->json([
                'success'  => false,
                'message' => 'Error uploading file'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $file = File::find($id);

        if ($file) {
            return response()->json([
                'success' => true,
                'data'    => $file
            ], 200);
        } else {
            return response()->json([
                'success'  => false,
                'message' => 'File not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update_workaround(Request $request, $id)
    {
        // File upload workaround
        return $this->update($request, $id);
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
        // Get file
        $file = File::find($id);

        if (empty($file)) {
            return response()->json([
                'success'  => false,
                'message' => 'File not found'
            ], 404);
        }

        // Validar fitxer
        $validatedData = $request->validate([
            'upload' => 'required|mimes:gif,jpeg,jpg,png|max:2048'
        ]);

        // Desar fitxer al disc i actualitzar dades a BD
        $upload = $request->file('upload');
        $ok = $file->diskSave($upload);

        if ($ok) {
            return response()->json([
                'success' => true,
                'data'    => $file
            ], 200);
        } else {
            return response()->json([
                'success'  => false,
                'message' => 'Error uploading file'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Get file
        $file = File::find($id);

        if (empty($file)) {
            return response()->json([
                'success'  => false,
                'message' => 'File not found'
            ], 404);
        }

        // Eliminar fitxer del disc i BD
        $ok = $file->diskDelete();

        if ($ok) {
            return response()->json([
                'success' => true,
                'data'    => $file
            ], 200);
        } else {
            return response()->json([
                'success'  => false,
                'message' => 'Error deleting file'
            ], 500);
        }
    }
}
