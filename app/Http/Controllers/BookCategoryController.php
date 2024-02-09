<?php

namespace App\Http\Controllers;

use App\Models\BookCategory;
use App\Models\Book;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\StoreBookCategoryRequest;
use App\Http\Requests\UpdateBookCategoryRequest;
use Inertia\Inertia;

class BookCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories', [
            'categories' => BookCategory::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CategoriesCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookCategoryRequest $request)
    {
        BookCategory::create([
            'name' => $request->input('name'),
        ]);

        return to_route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($uuid)
    {
        $category = BookCategory::where('uuid', $uuid)->firstOrFail();

        return Inertia::render('CategoriesShow', [
            'books' => Book::where('category_id', $category->id)->get(),
            'name' => $category->name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($uuid)
    {
        $category = BookCategory::where('uuid', $uuid)->firstOrFail();

        return Inertia::render('CategoriesEdit', [
            'name' => $category->name,
            'uuid' => $category->uuid,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookCategoryRequest $request, $uuid)
    {
        $category = BookCategory::where('uuid', $uuid)->firstOrFail();

        $category->name = $request->input('name');
        $category->save();

        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($uuid)
    {
        BookCategory::where('uuid', $uuid)
            ->first()
            ->delete();

        return to_route('categories.index');
    }
}
