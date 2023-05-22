<?php

// app/Http/Controllers/SubscriptionController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;
use Stripe\PaymentIntent;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        
        
        $amount = ($request->input('subscription') === 'monthly') ? 1.99 : 11.99;
    
        $intent = PaymentIntent::create([
            'amount' => $amount * 100, // Convertir el precio a centavos
            'currency' => 'eur',
        ]);
    
        $client_secret = $intent->client_secret;
        return response()->json(['success' => true, 'data' => $client_secret], 200);
    }
}