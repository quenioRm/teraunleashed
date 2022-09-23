<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\accountdb\accountinfo;
use App\Models\web\accountVerificationCode;
use App\Helper\Validator;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function Home()
    {
        return phpinfo();
    }

    public function RegisterAccountGet()
    {
        return view('auth.register');
    }

    public function RegisterAccountPost(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            '_email' => 'required|unique:accountDb.account_info,email|email',
            '_authKey' => '',
            '_password' => 'required|min:8',
            '_passwordCheck' => 'required|min:8|same:_password',
            '_name' => 'required|required|unique:accountDb.account_info,userName|min:5|max:10|alpha_dash',
            '_birth' => 'required|date_format:d/m/Y',
            '_nationCode' => 'required',
        ], [], [
            '_email' => 'e-mail',
            '_authKey' => 'confirm account code',
            '_password' => 'password',
            '_passwordCheck' => 'confirm password',
            '_name' => 'username',
            '_birth' => 'birth',
            '_nationCode' => 'nations'
        ]);

        if(!$validator->passes())
            return redirect(route('register'))->withInput()->withErrors($validator->errors());

        $check = accountVerificationCode::CheckAccountIsActivated($request['email']);
        if($check == 0){
            $validator->errors()->add('_email', 'Please check your account as it is not activated!');
            return redirect(route('register'))->withInput()->withErrors($validator->errors());
        }

        $request['_birth'] = Carbon::createFromFormat('d/m/Y', $request->_birth)->format('Y-m-d');

        $saveacc = accountinfo::RegisterAccount($request);

        return redirect()->route('register');

    }

    public function CheckEmailAccountGet(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|unique:accountDb.account_info,email|email',
        ], [], [
            'email' => 'E-mail'
        ]);

        if(!$validator->passes())
            return response()->json(['code' => 2,'msg' => $validator->errors()->first() ], 400);

        $check = accountVerificationCode::CheckAccountIsActivated($request['email']);
        if($check == 0){
            return response()->json(['code' => 200,'msg' => 'Account is already activated, complete your registration!'], 200);
        }

        $saveCode =  accountVerificationCode::MakeNewActivationCode($request['email']);
        if($saveCode['code'] == 1){
            $validator->errors()->add('email', 'Hold ' . $saveCode['minutes'] . ' minutes to request a new code!');
            return response()->json(['code' => 1,'msg' => $validator->errors()->first()], 400);
        }

        if($saveCode['code'] == 0){
            return response()->json(['code' => 0,'msg' => 'Email sent to requested destination!'], 200);
        }
    }

    public function ConfirmAccountPost(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|unique:accountDb.account_info,email|email',
            'authKey' => 'required'
        ], [], [
            'email' => 'E-mail',
            'authKey' => 'Confirmation Code'
        ]);

        if(!$validator->passes())
            return response()->json(['msg' => $validator->errors()->first() ], 400);

        $saveCode =  accountVerificationCode::FindAccountByCode($request['email'], $request['authKey']);

        if($saveCode['code'] == 1){
            $validator->errors()->add('email', 'Code expired, a new code has been sent to your email!');
            return response()->json(['msg' => $validator->errors()->first()], 400);
        }

        if($saveCode['code'] == 2){
            $validator->errors()->add('email', 'Account not found');
            return response()->json(['msg' => $validator->errors()->first()], 400);
        }

        if($saveCode['code'] == 0){
            return response()->json(['msg' => 'Your account has been activated and pre-registered in our database!'], 200);
        }
    }
}
