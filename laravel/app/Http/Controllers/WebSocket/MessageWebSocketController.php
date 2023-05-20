<?php

namespace App\Http\Controllers\Websockets;

use Illuminate\Http\Request;
use BeyondCode\LaravelWebSockets\WebSockets\Controllers\WebSocketController;
use App\Models\Message;
use Illuminate\Support\Facades\Log;
use App\Models\File;
use Carbon\Carbon;

class MessageWebSocketController extends WebSocketController
{
    public function __invoke(Request $request)
    {
        $message = json_decode($request->input('message'), true);

        // Obtener el tipo de mensaje
        $type = $message['type'];

        // Manejar el tipo de mensaje
        switch ($type) {
            case 'index':
                return $this->index();
            case 'store':
                return $this->store($message['data']);
            case 'show':
                return $this->show($message['data']['id']);
            case 'update':
                return $this->update($message['data']['id'], $message['data']);
            case 'destroy':
                return $this->destroy($message['data']['id']);
            default:
                return $this->defaultResponse();
        }
    }

    protected function index()
    {
        $messages = Message::all();

        $response = [
            'type' => 'index',
            'data' => $messages
        ];

        return $this->sendMessage(json_encode($response));
    }

    protected function store(array $data)
    {
        // Validar los datos recibidos
        $validatedData = $this->validateData($data);

        // Crear el mensaje
        $message = $this->createMessage($validatedData);

        // Enviar la respuesta
        $response = [
            'type' => 'store',
            'data' => $message,
            'message' => 'Message created successfully.'
        ];

        return $this->sendMessage(json_encode($response));
    }

    protected function show($id)
    {
        $message = Message::findOrFail($id);

        $response = [
            'type' => 'show',
            'data' => $message
        ];

        return $this->sendMessage(json_encode($response));
    }

    protected function update($id, array $data)
    {
        $message = Message::findOrFail($id);

        // Validar los datos recibidos
        $validatedData = $this->validateData($data);

        // Actualizar el mensaje
        $message->update($validatedData);

        // Enviar la respuesta
        $response = [
            'type' => 'update',
            'data' => $message,
            'message' => 'Message updated successfully.'
        ];

        return $this->sendMessage(json_encode($response));
    }

    protected function destroy($id)
    {
        $message = Message::findOrFail($id);

        // Eliminar el mensaje
        $message->delete();

        // Enviar la respuesta
        $response = [
            'type' => 'destroy',
            'message' => 'Message deleted successfully.'
        ];

        return $this->sendMessage(json_encode($response));
    }

    protected function defaultResponse()
    {
        $response = [
            'type' => 'unknown',
            'message' => 'Unknown message type.'
        ];

        return $this->sendMessage(json_encode($response));
    }

    protected function validateData(array $data)
    {
        $validatedData = validator($data, [
            'user_id' => 'required|exists:users,id',
            'route_id' => 'required|exists:routes,id',
            // 'date' => 'required|date_format:Y-m-d H:i:s',
            'text' => 'nullable|string|max:255',
            'imageUri' => 'nullable',
            'img_author_message' => 'required|string|max:255',
            'author_name' => 'required|string|max:255',
        ])->validate();

        $validatedData['date'] = Carbon::now()->format('Y-m-d H:i:s');

        return $validatedData;
    }

    protected function createMessage(array $validatedData)
    {
        if (array_key_exists('imageUri', $validatedData)) {
            $imageUri = $validatedData['imageUri'];
            $file = new File();
            $ok = $file->diskSave($imageUri);
            if ($ok) {
                $messageData = [
                    'user_id' => $validatedData['user_id'],
                    'route_id' => $validatedData['route_id'],
                    'date' => $validatedData['date'],
                    'file_id' => $file->id,
                    'img_author_message' => $validatedData['img_author_message'],
                    'author_name' => $validatedData['author_name']
                ];
                if ($validatedData['text']) {
                    $messageData['text'] = $validatedData['text'];
                }
                return Message::create($messageData);
            } else {
                throw new \Exception('Error uploading file');
            }
        } else {
            if ($validatedData['text']) {
                return Message::create([
                    'user_id' => $validatedData['user_id'],
                    'route_id' => $validatedData['route_id'],
                    'date' => $validatedData['date'],
                    'text' => $validatedData['text'],
                    'img_author_message' => $validatedData['img_author_message'],
                    'author_name' => $validatedData['author_name']
                ]);
            } else {
                throw new \Exception('Error creating message');
            }
        }
    }
}
