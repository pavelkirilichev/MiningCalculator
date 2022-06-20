<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HardWareController extends Controller
{
    private $whiteList = ['Ethash', 'Etchash', 'SHA-256', 'BCD'];

    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function index() {
        $users = DB::table('hardware', 'h')
            ->whereExists(function($query) {
                $query
                    ->select(DB::raw('*'))
                    ->from('hardware_alg', 'a')
                    ->whereColumn('h.id', 'a.hardware_id')
                    ->whereIn('a.name', $this->whiteList);
            })
            ->limit(30)
            ->get();

        $hardware_dop = DB::table('hardware_dop', 'h')
            ->whereExists(function($query) {
                $query
                    ->select(DB::raw('*'))
                    ->from('hardware_alg_dop', 'a')
                    ->whereColumn('h.id', 'a.hardware_id')
                    ->whereIn('a.name', $this->whiteList);
            })
            ->limit(30)
            ->get();

        // return $users;
        return $users->concat($hardware_dop);
    }

    public function getByName($search) {
        $users = DB::table('hardware', 'h')
            ->whereExists(function($query) {
                $query
                    ->select(DB::raw('*'))
                    ->from('hardware_alg', 'a')
                    ->whereColumn('h.id', 'a.hardware_id')
                    ->whereIn('a.name', $this->whiteList);
            })
            ->where('name', 'LIKE', '%'.$search.'%')
            ->limit(30)
            ->get();

        $hardware_dop = DB::table('hardware_dop', 'h')
            ->whereExists(function($query) {
                $query
                    ->select(DB::raw('*'))
                    ->from('hardware_alg_dop', 'a')
                    ->whereColumn('h.id', 'a.hardware_id')
                    ->whereIn('a.name', $this->whiteList);
            })
            ->where('name', 'LIKE', '%'.$search.'%')
            ->limit(30)
            ->get();

        return $users->concat($hardware_dop);
    }
}
