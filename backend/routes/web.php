<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::get('/', function()
{
    return 'welcome';
});

Route::get('/api/books', [BookController::class, 'index']);

Route::get('/api/books/{id}', [BookController::class, 'show']);