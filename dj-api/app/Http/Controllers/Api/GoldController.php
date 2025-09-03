<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GoldPrice;
use Illuminate\Http\Request;

class GoldController extends Controller
{
    public function index(Request $request)
    {
        $days = (int) $request->get('days', 30);
        $data = GoldPrice::orderByDesc('priced_at')->limit($days)->get()->sortBy('priced_at')->values();

        return response()->json($data);
    }
}
