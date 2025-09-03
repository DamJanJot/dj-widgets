<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\RateController;
use App\Http\Controllers\Api\CryptoController;
use App\Http\Controllers\Api\GoldController;

Route::get('/news',  [NewsController::class, 'index']);
Route::get('/rates', [RateController::class, 'index']);
Route::get('/crypto', [CryptoController::class, 'index']);
Route::get('/gold',  [GoldController::class, 'index']);
