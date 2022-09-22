<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/Register', 'Auth\AuthController@RegisterAccountGet')->name('register');
Route::post('/CheckEmailAccountGet', 'Auth\AuthController@CheckEmailAccountGet')->name('checkemailaccountget');