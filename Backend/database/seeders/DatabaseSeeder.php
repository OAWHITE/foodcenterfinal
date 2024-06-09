<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UsersTableSeeder::class,
            RecipesTableSeeder::class,
            IngredientsTableSeeder::class,
            CoachesTableSeeder::class,
            ChefsTableSeeder::class,
            CelebritiesTableSeeder::class,
            CelebrityRecipesTableSeeder::class,
            UserRecipesTableSeeder::class,
            RecipeIngredientsTableSeeder::class,
        ]);
    }
}
