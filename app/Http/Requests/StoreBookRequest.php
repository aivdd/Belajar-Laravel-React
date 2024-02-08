<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return User::find(auth()->user()->id)->hasPermissionTo('create buku');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'jumlah' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'cover' => 'required|image|mimes:jpeg,jpg,png',
            'files' => 'required|mimes:pdf',
        ];
    }
}
