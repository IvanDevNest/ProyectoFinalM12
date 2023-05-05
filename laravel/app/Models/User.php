<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{   
     use \Backpack\CRUD\app\Models\Traits\CrudTrait;

    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'name',
        'email',
        'lastname',
        'secound_sourname',
        'id_role',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function routes()
    {
        return $this->belongsToMany(Route::class, 'inscriptions');
    }
}
