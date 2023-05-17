<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'user_id',
        'route_id',
        'date',
        'text',
        'file_id',
        'img_author_message',
        'author_name'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function route()
    {
        return $this->belongsTo(Route::class, 'route_id');
    }
    public function file()
    {
        return $this->belongsTo(File::class, 'file_id');
    }
}
