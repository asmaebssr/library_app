<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    function index()
    {
        $books = Book::all();
        return response()->json($books);
        
    }

    function show($id)
    {
        $book = Book::find($id);
        return response()->json($book);
    }

}
