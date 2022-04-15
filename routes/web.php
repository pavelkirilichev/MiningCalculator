<?php
use App\Http\Controllers\CoinController;
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

Route::get('/{lang?}', function ($lang = '') {
    if (! in_array($lang, ['en', '']))  {
        abort(404);
    }

    App::setLocale($lang ? $lang : 'ru');

    return view('pages.homepage');
});
Route::get('/coin', [CoinController::class, 'show']);
