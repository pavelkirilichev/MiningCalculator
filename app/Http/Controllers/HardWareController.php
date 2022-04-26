<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
 

 
class HardWareController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function show(Request $request) {
        dd($request->all());
        $arr = $request->get('id');
        $users = DB::table('hardware_alg')->whereIn('hardware_id', $arr)->get();
        return $users;
    }
}
