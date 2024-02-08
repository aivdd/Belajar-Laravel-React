<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\Books;

class ExportExcel extends Controller
{
    public function export()
    {
        return Excel::download(new Books, 'books.xlsx');
    }
}
