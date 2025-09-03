<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Crypto;

class CryptoController extends Controller
{
    public function index()
    {
        $list = Crypto::orderByDesc('market_cap_usd')->limit(20)->get();
        return response()->json($list);
    }
}
