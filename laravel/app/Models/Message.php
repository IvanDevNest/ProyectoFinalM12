<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function route()
    {
        return $this->belongsTo(Route::class, 'id_route');
    }
}
