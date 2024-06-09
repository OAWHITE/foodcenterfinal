<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('ingredients')->insert([
            ['name' => 'Tomato', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Onion', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Garlic', 'created_at' => now(), 'updated_at' => now()],
            // Add more ingredients as needed
        ]);
    }
}
