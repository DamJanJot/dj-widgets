<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Crypto;

class CryptoSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['symbol' => 'BTC', 'name' => 'Bitcoin',  'price_usd' => 60000, 'change_24h' => 1.2,  'market_cap_usd' => 1200000000000],
            ['symbol' => 'ETH', 'name' => 'Ethereum', 'price_usd' => 2600,  'change_24h' => -0.8, 'market_cap_usd' => 320000000000],
            ['symbol' => 'USDT','name' => 'Tether',   'price_usd' => 1,     'change_24h' => 0.0,  'market_cap_usd' => 100000000000],
        ];
        foreach ($data as $row) Crypto::create($row);
    }
}
