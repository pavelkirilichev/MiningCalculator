<?php
use App\Http\Controllers\CoinController;
use App\Http\Controllers\HardWareController;
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

Route::get('/coins', 'CoinController@index');
Route::get('/coins/filter/{search}', 'CoinController@getByName');
Route::post('/coins/algorithm', 'CoinController@getByAlgorithmsName');

Route::get('/hardware', 'HardWareController@index');
Route::get('/hardware/filter/{search}', 'HardWareController@getByName');

Route::post('/algorithm/hardware', 'HardWareAlgController@getByHardwareId');

Route::get('/{lang?}', function ($lang = '') {
    if (! in_array($lang, ['en', '']))  {
        abort(404);
    }

    App::setLocale($lang ? $lang : 'ru');

    return view('pages.homepage');
});

