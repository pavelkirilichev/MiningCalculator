<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

 
class CoinController extends Controller
{
    private $whiteList = ['Ethash', 'Etchash', 'SHA-256', 'BCD'];

    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function index() {
        $users = DB::table('coins')
            ->whereIn('algorithm', $this->whiteList)
            ->groupBy('algorithm')
            ->limit(30)
            ->get();

        return $users;
    }

    public function getByName($search) {
        $users = DB::table('coins', 'c')
            ->where('algorithm', 'LIKE', '%'.$search.'%')
            ->whereIn('algorithm', $this->whiteList)
            ->groupBy('algorithm')
            ->limit(30)
            ->get();

        return $users;
    }

    public function getByAlgorithmsName(Request $request) {
        $ids = $request->post('algorithm') ?? [];
        $filteredIds = \array_filter($ids, function($el) {
            return in_array($el, $this->whiteList);
        });
        $users = DB::table('coins')
            ->whereIn('algorithm', $filteredIds)
            ->get();

        return $users;
    }
}