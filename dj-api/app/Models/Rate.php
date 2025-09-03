<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $fillable = ['base', 'symbol', 'value', 'as_of'];

    protected $casts = [
        'value' => 'decimal:6',
        'as_of' => 'datetime',
    ];
}
