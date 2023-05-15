<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    const ADMIN = 1;
    const VIP = 2;
    const VETERANO  = 3;
    const NOVATO  = 4;
    
    protected $fillable = [
        'id',
        'name',
    ];
}
