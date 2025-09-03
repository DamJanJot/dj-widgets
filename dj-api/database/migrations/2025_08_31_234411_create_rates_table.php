<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('rates', function (Blueprint $table) {
            $table->id();
            $table->string('base', 6)->index();   // np. PLN
            $table->string('symbol', 6)->index(); // np. USD, EUR
            $table->decimal('value', 14, 6);
            $table->timestamp('as_of')->nullable()->index();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('rates');
    }
};
