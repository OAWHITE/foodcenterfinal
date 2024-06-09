<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CelebrityRecipesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('celebrity_recipes')->insert([
            [
                'celebrity_id' => 1,
                'recipe_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'celebrity_id' => 2,
                'recipe_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Add more celebrity recipes as needed
        ]);
    }
}
