<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

function percentageBetweenTwoNumbers($a, $b) {
    $res = 100 * ($b - $a) / $a;

    return $res;
}
 
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


        foreach($users as $user) {
            $date = new \DateTime(date("y-m-d"));
            $date_ts = $date->getTimestamp();
            $day_ago = date('y-m-d', $date_ts - 86400);
            $week_ago = date('y-m-d', $date_ts - 86400 * 7);
            $month_ago = date('y-m-d', $date_ts - 86400 * 30);

            $day_ago_coin = DB::table("coin_difficulty")->select('difficulty')->where('date', '=', $day_ago)->first();
            $week_ago_coin = DB::table("coin_difficulty")->select('difficulty')->where('date', '=', $week_ago)->first();
            $month_ago_coin = DB::table("coin_difficulty")->select('difficulty')->where('date', '=', $month_ago)->first();

            $rate = [
                'day' => 1.3,
                'week' => 1.3,
                'month' => 1.3
            ];

            if($day_ago_coin) $rate['day'] = percentageBetweenTwoNumbers($user->difficulty, $day_ago_coin->difficulty);
            if($week_ago_coin) $rate['week'] = $week_ago_coin->difficulty;
            if($month_ago_coin) $rate['month'] = $month_ago_coin->difficulty;

            $user->rate = $rate;
        }

        return $users;
    }
}