<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BookCategory;

class BookCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'uuid' => '9af81904-94d8-4b1f-a30c-44bd24919f7d',
                'name' => 'Anak-anak',
                'created_at' => '2023-12-30 02:33:42',
                'updated_at' => '2023-12-30 02:33:42',
            ],
            [
                'uuid' => '9af818d7-8b1d-4c6e-bf3d-e91e69f71774',
                'name' => 'Pendidikan',
                'created_at' => '2023-12-30 02:33:13',
                'updated_at' => '2023-12-30 02:33:13',
            ],
            [
                'uuid' => '9af818c9-2b60-486e-9ca5-885836f90227',
                'name' => 'Teknologi',
                'created_at' => '2023-12-30 02:33:04',
                'updated_at' => '2023-12-30 02:33:04',
            ],
        ];

        foreach ($categories as $category) {
            BookCategory::create($category);
        }
    }
}
