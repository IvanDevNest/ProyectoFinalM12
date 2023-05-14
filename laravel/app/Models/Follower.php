<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_follower',
        'id_followed'
    ];
    public function seguidor()
    {
        return $this->belongsTo(User::class, 'id_follower');
    }

    public function seguido()
    {
        return $this->belongsTo(User::class, 'id_followed');
    }
}
