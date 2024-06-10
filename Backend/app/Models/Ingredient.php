<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'image',
        'calories',
        'fat',
        'carbs',
        'protein',
        'avg_rating',
    ];
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients');
    }
   

    public function units()
    {
        return $this->belongsToMany(Unit::class, 'recipe_ingredients', 'ingredient_id')->withPivot('quantity');
    }
}
