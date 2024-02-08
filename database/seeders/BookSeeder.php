<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = [2, 3];

        foreach ($userIds as $userId) {
            Book::factory()->create([
                'user_id' => $userId,
            ]);
        }
    }
}
