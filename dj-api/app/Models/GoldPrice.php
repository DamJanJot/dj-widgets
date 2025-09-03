<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoldPrice extends Model
{
    protected $fillable = ['priced_at', 'price_pln', 'price_usd'];

    protected $casts = [
        'priced_at' => 'date',
        'price_pln' => 'decimal:2',
        'price_usd' => 'decimal:2',
    ];
}
