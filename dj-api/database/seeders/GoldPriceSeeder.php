<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GoldPrice;
use Illuminate\Support\Carbon;

class GoldPriceSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 30; $i >= 0; $i--) {
            GoldPrice::create([
                'priced_at' => Carbon::today()->subDays($i),
                'price_pln' => 300 + rand(0, 50),
                'price_usd' => 1900 + rand(0, 80),
            ]);
        }
    }
}
