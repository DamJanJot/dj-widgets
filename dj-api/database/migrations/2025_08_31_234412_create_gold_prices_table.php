<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('gold_prices', function (Blueprint $table) {
            $table->id();
            $table->date('priced_at')->index();
            $table->decimal('price_pln', 12, 2)->nullable();
            $table->decimal('price_usd', 12, 2)->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('gold_prices');
    }
};
