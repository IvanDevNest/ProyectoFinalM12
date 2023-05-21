<?php

// app/Http/Controllers/SubscriptionController.php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Plan;
use Stripe\Customer;
use Stripe\Subscription;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        
        Stripe::setApiKey('sk_test_51N9rwKIDlfyhoNNpI2xazoeJPPbcgOw3RdsHDLqxf4ROpcVdrNqasGxxgqVpUm2twmvPoeUK8vGtEGgIU80Gn2ZB00ofweKda5');

        $intent = \Stripe\PaymentIntent::create([
          'amount' => 12,
          'currency' => 'eur',
        ]);
        $client_secret = $intent->client_secret;
        return response()->json(['succes' => 'true','data'=>$client_secret], 200);
        // try {
        //     // Establecer la clave secreta de Stripe
        //     Stripe::setApiKey(env('STRIPE_SECRET'));

        //     // Crear un token de tarjeta de crédito
        //     $token = \Stripe\Token::create([
        //         'card' => [
        //             'number' => $request->number,
        //             'exp_month' => $request->exp_month,
        //             'exp_year' => $request->exp_year,
        //             'cvc' => $request->cvc,
        //         ],
        //     ]);

        //     // Crear un cargo en Stripe
        //     $charge = \Stripe\Charge::create([
        //         'amount' => $request->amount,
        //         'currency' => 'eur',
        //         'source' => $token->id,
        //         'description' => $request->description,
        //     ]);

        //     // Devolver una respuesta JSON con el estado del cargo
        //     return response()->json([$charge->status], 201);
        // } catch (CardException $ex) {
        //     // Capturar errores de tarjeta
        //     return response()->json(['response' => 'Error: ' . $ex->getMessage()], 400);
        // } catch (ApiErrorException $ex) {
        //     // Capturar otros errores de la API de Stripe
        //     return response()->json(['response' => 'Error: ' . $ex->getMessage()], 500);
        // } catch (Exception $ex) {
        //     // Capturar otros errores
        //     return response()->json(['response' => 'Error: ' . $ex->getMessage()], 500);
        // }

    }
}