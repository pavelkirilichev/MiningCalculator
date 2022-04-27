<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
 

 
class CoinController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function index() {
        $users = DB::table('coins')->limit(30)->get();
        return $users;
    }

    public function getByName($search) {
        $users = DB::table('coins')->where('algorithm', 'LIKE', '%'.$search.'%')->groupBy('algorithm')->limit(30)->get();

        return $users;
    }

    public function getByAlgorithmsName(Request $request) {
        $ids = $request->post('algorithm');
        $users = DB::table('coins')->whereIn('algorithm', $ids ?? [])->get();

        return $users;
    }
}