<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
 

 
class CoinController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function show() {
        $response = Http::get('https://api.minerstat.com/v2/coins');
        return $response->json($key = null);
    }
}