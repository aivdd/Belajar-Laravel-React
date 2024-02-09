<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCategory;
use App\Exports\BookExports;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Book::class);

        $booksQuery = auth()
            ->user()
            ->hasRole('admin')
            ? Book::with('category')
            : auth()
                ->user()
                ->books()
                ->with('category');

        return Inertia::render('Book', [
            'books' => $booksQuery->get(),
            'category' => BookCategory::all(),
            'canManageCategories' => auth()
                ->user()
                ->can('manage categories'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BookTambah', [
            'categories' => BookCategory::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $book = new Book([
            'judul' => $request->input('judul'),
            'deskripsi' => $request->input('deskripsi'),
            'jumlah' => $request->input('jumlah'),
            'category_id' => $request->input('category_id'),
            'user_id' => auth()->user()->id,
            'cover' => $request->file('cover')->store('assets/cover', 'public'),
            'files' => $request->file('files')->store('assets/files', 'public'),
        ]);
        $book->save();

        return Redirect::route('books')->with(
            'successMessage',
            'Sukses Tambah Buku'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show($uuid)
    {
        $book = Book::where('uuid', $uuid)
            ->with('category')
            ->firstOrFail();
        return Inertia::render('BookDetail', [
            'judul' => $book->judul,
            'category' => $book->category->name,
            'category_uuid' => $book->category->uuid,
            'deskripsi' => $book->deskripsi,
            'jumlah' => $book->jumlah,
            'files' => $book->files,
            'cover' => $book->cover,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($uuid)
    {
        return Inertia::render('BookEdit', [
            'book' => Book::where('uuid', $uuid)
                ->with('category')
                ->firstOrFail(),
            'categories' => BookCategory::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, $uuid)
    {
        $book = Book::where('uuid', $uuid)->firstOrFail();

        $book->judul = $request->input('judul');
        $book->deskripsi = $request->input('deskripsi');
        $book->jumlah = $request->input('jumlah');
        $book->category_id = $request->input('category_id');

        if ($request->hasFile('cover')) {
            $book->cover = $request
                ->file('cover')
                ->store('assets/cover', 'public');
        }
        if ($request->hasFile('files')) {
            $book->files = $request
                ->file('files')
                ->store('assets/files', 'public');
        }

        $book->save();

        return to_route('books');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($uuid)
    {
        Book::where('uuid', $uuid)
            ->first()
            ->delete();
        return to_route('books');
    }

    public function export()
    {
        return Excel::download(new BookExports(), 'Books.xlsx');
    }
}
