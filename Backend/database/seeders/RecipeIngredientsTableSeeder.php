<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipeIngredientsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('recipe_ingredients')->insert([
            [
                'recipe_id' => 1,
                'ingredient_id' => 1,
                'quantity' => '2 cups',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'recipe_id' => 1,
                'ingredient_id' => 2,
                'quantity' => '1 onion',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Add more recipe ingredients as needed
        ]);
    }
}
