<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRecipesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_recipes')->insert([
            [
                'user_id' => 1,
                'recipe_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'user_id' => 2,
                'recipe_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Add more user recipes as needed
        ]);
    }
}
