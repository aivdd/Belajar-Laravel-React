<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\ExportExcel;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::patch('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );

    Route::get('/books', [BookController::class, 'index'])->name('books');
    Route::get('/book/create', [BookController::class, 'create'])->name(
        'book.create'
    );
    Route::post('/book', [BookController::class, 'store'])->name('book.store');

    Route::get('/categories', [BookCategoryController::class, 'index'])->name(
        'categories.index'
    );
    Route::get('/categories/create', [
        BookCategoryController::class,
        'create',
    ])->name('categories.create');
    Route::post('/categories', [BookCategoryController::class, 'store'])->name(
        'categories.store'
    );
    Route::get('/categories/{uuid}/edit', [
        BookCategoryController::class,
        'edit',
    ])->name('categories.edit');
    Route::patch('/categories/{uuid}', [
        BookCategoryController::class,
        'update',
    ])->name('categories.update');
    Route::delete('/category/{uuid}', [
        BookCategoryController::class,
        'destroy',
    ])->name('category.destroy');

    Route::get('/export-books', [BookController::class, 'export'])->name(
        'export.books'
    );
});

Route::middleware(['auth', 'ensureOwner'])->group(function () {
    Route::get('/book/{uuid}', [BookController::class, 'show'])->name(
        'book.show'
    );
    Route::get('/book/{uuid}/edit', [BookController::class, 'edit'])->name(
        'book.edit'
    );
    Route::patch('/book/{uuid}', [BookController::class, 'update'])->name(
        'book.update'
    );
    Route::delete('/book/{uuid}', [BookController::class, 'destroy'])->name(
        'book.destroy'
    );

    Route::get('/categories/{uuid}', [
        BookCategoryController::class,
        'show',
    ])->name('categories.show');
});

Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);
    if (Storage::exists('public/' . $path)) {
        return new BinaryFileResponse($filePath);
    }
    abort(404, 'File Not Found');
})->where('path', '.*');

require __DIR__ . '/auth.php';
