<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 10);
        $news = News::orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate($perPage);

        return response()->json($news);
    }
}
