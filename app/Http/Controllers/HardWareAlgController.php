<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HardWareAlgController extends Controller
{
    //
    
    public function getByHardwareId(Request $request) {
        $arr = $request->post('id');
        $hardware_alg = DB::table('hardware_alg')->whereIn('hardware_id', $arr ?? [])->get();
        $hardware_alg_dop = DB::table('hardware_alg_dop')->whereIn('hardware_id', $arr ?? [])->get();

        return $hardware_alg + $hardware_alg_dop;
    }
}
