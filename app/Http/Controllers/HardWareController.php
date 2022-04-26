<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HardWareController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function index() {
        $users = DB::table('hardware')->limit(30)->get();
        return $users;
    }

    public function getByName($search) {
        $users = DB::table('hardware')->where('name', 'LIKE', '%'.$search.'%')->limit(30)->get();

        return $users;
    }
}
