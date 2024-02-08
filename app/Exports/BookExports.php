<?php

namespace App\Exports;

use App\Models\Book;
use Maatwebsite\Excel\Concerns\FromCollection;

class BookExports implements FromCollection
{
    public function collection()
    {
        $user = auth()->user();
        $books = $user->hasRole('admin')
        ? Book::all()
        : $user->books;
        return $books;
    }
}
