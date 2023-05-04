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
    
    public function file()
    {
        return $this->belongsTo(File::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function author()
    {
        return $this->belongsTo(User::class);
    }
    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'inscriptions');
    }
}
