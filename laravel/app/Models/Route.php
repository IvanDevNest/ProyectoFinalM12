<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'date',
        'estimated_duration',
        'type_vehicle',
        'distance',
        'url_maps',
        'num_stops',
        'max_users',
        'latitude',
        'longitude',
        'author_id',
        'id_route_style',

    ];
    
    public function file()
    {
        return $this->belongsTo(File::class);
    }
    
    public function users()
{
    return $this->hasMany(User::class);
}

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'id_user');
    // }

    // public function author()
    // {
    //     return $this->belongsTo(User::class);
    // }
    // // public function inscriptions()
    // // {
    // //     return $this->hasMany(Inscription::class);
    // // }

    // public function users()
    // {
    //     return $this->belongsToMany(User::class, 'inscriptions');
    // }
}
