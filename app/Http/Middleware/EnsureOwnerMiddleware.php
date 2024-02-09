<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Book;

class EnsureOwnerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $uuid = $request->route('uuid');
        $book = Book::where('uuid', $uuid)->first();

        if (
            auth()
                ->user()
                ->hasRole('admin')
        ) {
            return $next($request);
        }

        if ($book->user_id === auth()->user()->id) {
            //abort(403, 'Unauthorized');
            return $next($request);
        }
        return abort(403, 'Unauthorized');
    }
}
