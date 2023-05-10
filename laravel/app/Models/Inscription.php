<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory;
    public $incrementing = false;

    protected $fillable = [
        'author_id',
        'route_id'
    ];
}
