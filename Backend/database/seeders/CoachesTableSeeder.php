<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoachesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('coaches')->insert([
            [
                'name' => 'Coach John',
                'description' => 'Fitness expert and personal trainer.',
                'experience' => '10 years',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Coach Emily',
                'description' => 'Yoga instructor and wellness coach.',
                'experience' => '8 years',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Add more coaches as needed
        ]);
    }
}
