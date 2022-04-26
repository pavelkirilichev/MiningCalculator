<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HardWareAlgController extends Controller
{
    //
    
    public function getByHardwareId(Request $request) {
        $arr = $request->post('id');
        $users = DB::table('hardware_alg')->whereIn('hardware_id', $arr ?? [])->get();

        return $users;
    }
}
