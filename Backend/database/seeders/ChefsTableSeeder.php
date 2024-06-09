<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChefsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('chefs')->insert([
            [
                'name' => 'Chef Gordon Ramsay',
                'description' => 'World-renowned chef and TV personality.',
                'experience' => '30 years',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Chef Jamie Oliver',
                'description' => 'Celebrity chef and cookbook author.',
                'experience' => '25 years',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Add more chefs as needed
        ]);
    }
}
