<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\accountdb\accountinfo;

class AuthController extends Controller
{
    public function RegisterAccountGet()
    {
        return view('auth.register');
    }

    public function CheckEmailAccountGet(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|unique:accountDb.account_info,email|email',
        ], [], [
            'email' => 'E-mail'
        ]);

        if(!$validator->passes())
            return response()->json(['code' => -1, 'msg' => $validator->errors() ], 400);

        return response()->json(['code' => 0, 'msg' => 'Sucesso!'], 200);
    }
}
