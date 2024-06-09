<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Celebrity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'celebrityimage',
    ];
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'celebrity_recipes');
    }
}
