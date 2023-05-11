<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\File;
use App\Models\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class TokenController extends Controller
{
    public function user(Request $request)
    {
        $user = User::where('email', $request->user()->email)->first();

        return response()->json([
            "success" => true,
            "user" => $request->user(),
            // "roles"   => $user->getRoleNames(),
        ]);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::attempt($credentials)) {
            // Get user
            $user = User::where([
                ["email", "=", $credentials["email"]]
            ])->firstOrFail();
            // Revoke all old tokens
            $user->tokens()->delete();
            // Generate new token
            $token = $user->createToken("authToken")->plainTextToken;
            // Token response
            return response()->json([
                "success" => true,
                "authToken" => $token,
                "tokenType" => "Bearer"
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Invalid login credentials"
            ], 401);
        }
    }
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }
    protected function register(Request $request)
    {
        Log::debug($request);
        $validacion = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['nullable', 'string', 'max:255'],
            'second_surname' => ['nullable', 'string', 'max:255'],
            'imageUri' => ['nullable'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $imageUri = $request->input('imageUri');
    
        // Descargar la imagen de la URL y guardarla en una ruta temporal
        $tempImagePath = tempnam(sys_get_temp_dir(), 'image');
        file_put_contents($tempImagePath, file_get_contents($imageUri));
        
        // Crear una instancia de UploadedFile a partir de la ruta temporal
        $uploadedFile = new UploadedFile(
            $tempImagePath,
            Str::random(16) . '.jpg', // nombre aleatorio para el archivo
            mime_content_type($tempImagePath),
            null,
            true // $test = true para evitar que se mueva el archivo a la ruta de almacenamiento
        );

        // Desar fitxer al disc i inserir dades a BD
        $file = new File();
        $ok = $file->diskSave($uploadedFile);
        unlink($tempImagePath);
        if ($ok) {
            $user = User::create([
                'name' => $validacion['name'],
                // 'lastname'=> $validacion['lastname'],
                // 'second_surname'=> $validacion['second_surname'],
                'file_id' => $file->id,
                'email' => $validacion['email'],
                'password' => Hash::make($validacion['password']),
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Error uploading file'
            ], 421);
        }


        $token = $user->createToken("authToken")->plainTextToken;

        return response()->json([
            "success" => true,
            "authToken" => $token,
            "tokenType" => "Bearer"
        ], 200);

    }
    public function logout(Request $request)
    {
        Log::debug($request);
        // Revoke token used to authenticate current request...
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "success" => true,
            "message" => "Current token revoked",
        ]);
    }




}