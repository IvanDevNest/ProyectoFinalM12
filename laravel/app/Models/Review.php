<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public function reviewed()
    {
        return $this->belongsTo(User::class, 'id_reviewed');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'id_author');
    }
}
