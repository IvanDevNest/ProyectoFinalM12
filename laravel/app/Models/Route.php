<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'timetable',
        'cord_x',
        'cord_y',
        'URL_maps',
        'num_stops',
        'max_users',
        'id_user',
        'id_route_style',
    ];
}
