<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use Illuminate\Http\Request;

class RateController extends Controller
{
    public function index(Request $request)
    {
        $base = $request->get('base', 'PLN');
        $latest = Rate::where('base', $base)
            ->orderByDesc('as_of')
            ->orderByDesc('id')
            ->limit(50)
            ->get();

        return response()->json($latest);
    }
}
