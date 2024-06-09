<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecipesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('recipes')->insert([
            [
                'title' => 'Spaghetti Bolognese',
                'description' => 'A classic Italian pasta dish.',
                'rating' => 4.5,
                'region' => 'Italy',
                'image' => 'spaghetti_bolognese.jpg',
                'instructions' => 'Cook the pasta. Prepare the sauce. Mix together and serve.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Chicken Curry',
                'description' => 'A spicy and flavorful dish.',
                'rating' => 4.8,
                'region' => 'India',
                'image' => 'chicken_curry.jpg',
                'instructions' => 'Cook the chicken. Prepare the curry sauce. Mix together and serve.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Add more recipes as needed
        ]);
    }
}
