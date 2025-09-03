<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rate;

class RateSeeder extends Seeder
{
    public function run(): void
    {
        $base = 'PLN';
        $symbols = ['USD' => 3.66, 'EUR' => 4.27, 'GBP' => 4.93, 'CHF' => 4.41];

        foreach ($symbols as $sym => $val) {
            Rate::create([
                'base' => $base,
                'symbol' => $sym,
                'value' => $val,
                'as_of' => now(),
            ]);
        }
    }
}
