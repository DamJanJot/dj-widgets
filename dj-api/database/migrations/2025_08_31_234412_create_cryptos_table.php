<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cryptos', function (Blueprint $table) {
            $table->id();
            $table->string('symbol', 16)->index();
            $table->string('name');
            $table->decimal('price_usd', 18, 8)->default(0);
            $table->decimal('change_24h', 9, 4)->default(0);
            $table->decimal('market_cap_usd', 22, 2)->default(0);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('cryptos');
    }
};
