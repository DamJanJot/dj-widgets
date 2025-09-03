<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Crypto extends Model
{
    protected $fillable = ['symbol', 'name', 'price_usd', 'change_24h', 'market_cap_usd'];

    protected $casts = [
        'price_usd' => 'decimal:8',
        'change_24h' => 'decimal:4',
        'market_cap_usd' => 'decimal:2',
    ];
}
