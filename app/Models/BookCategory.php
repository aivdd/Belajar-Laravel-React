<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use App\Models\Book;

class BookCategory extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'category_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }
}
