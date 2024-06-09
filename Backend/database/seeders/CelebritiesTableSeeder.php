<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CelebritiesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('celebrities')->insert([
            [
                'name' => 'Celebrity Chef A',
                'description' => 'Known for amazing cooking skills.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Celebrity Chef B',
                'description' => 'Famous for unique recipes.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Add more celebrities as needed
        ]);
    }
}
