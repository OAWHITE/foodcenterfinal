<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image', 'instructions','calories','region','fat','carbs','protein',
    ];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? url('images/' . $this->image) : null;
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients');
    }
    public function celebrities()
    {
        return $this->belongsToMany(Celebrity::class, 'celebrity_recipes');
    }
  
}
