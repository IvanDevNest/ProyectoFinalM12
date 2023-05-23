<?php

// app/Http/Controllers/SubscriptionController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

use Spatie\Permission\Models\Role;
use App\Models\User;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;
use Stripe\PaymentIntent;

class SubscriptionController extends Controller
{
    public function subscribe(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $subscription = $request->input('subscription');
        Log::debug('Subscription value: ' . $subscription);

        $amount = ($subscription === 'monthly') ? 1.99 : 11.99;

        $intent = PaymentIntent::create([
            'amount' => $amount * 100,
            'currency' => 'eur',
        ]);

        $userId = auth()->user()->id;
        $usuario = User::findOrFail($userId);
        $rol = Role::where('name', 'vip')->firstOrFail();
    
        $usuario->syncRoles($rol);
        
        $client_secret = $intent->client_secret;

        return response()->json([
            'success' => true,
             'message'=>'Vip comprado y rol actualizado',
             'data' => $client_secret],
              200);
    }
}