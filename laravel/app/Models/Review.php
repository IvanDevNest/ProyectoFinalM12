<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'reviewed_id',
        'author_review_id',
        'score'
    ];
    public function reviewed()
    {
        return $this->belongsTo(User::class, 'reviewed_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_review_id');
    }
}
