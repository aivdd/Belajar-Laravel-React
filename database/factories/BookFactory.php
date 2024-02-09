<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Book;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    protected $model = Book::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categoryIds = [1, 2, 3];
        return [
            'category_id' => $this->faker->randomElement($categoryIds),
            'user_id' => $this->faker->numberBetween(2, 3),
            'judul' => $this->faker->sentence,
            'deskripsi' => $this->faker->paragraph,
            'jumlah' => $this->faker->numberBetween(1, 20),
            'files' => 'assets/files/book.pdf',
            'cover' => 'assets/cover/cover.png',
        ];
    }
}
