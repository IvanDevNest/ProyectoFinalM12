<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteStyle extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
    ];

    public function routes()
    {
        return $this->hasMany(Route::class);
    }
}
