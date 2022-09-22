<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\accountdb\accountinfo;
use App\Models\web\accountVerificationCode;
use App\Helper\Validator;

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

    public function CheckEmailAccountGet(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|unique:accountDb.account_info,email|email',
        ], [], [
            'email' => 'E-mail'
        ]);

        if(!$validator->passes())
            return response()->json(['msg' => $validator->errors()->first() ], 400);

        $check = accountVerificationCode::CheckAccountIsActivated($request['email']);
        if($check == 0){
            return response()->json(['msg' => 'Conta ja se encontra ativada!'], 200);
        }

        $saveCode =  accountVerificationCode::MakeNewActivationCode($request['email']);
        if($saveCode['code'] == 1){
            $validator->errors()->add('email', 'Aguarde ' . $saveCode['minutes'] . ' minutos para solicitar um novo código!');
            return response()->json(['msg' => $validator->errors()->first()], 400);
        }

        if($saveCode['code'] == 0){
            return response()->json(['msg' => 'Email enviado para o destino solicitado!'], 200);
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
            $validator->errors()->add('email', 'Código expirado, um novo código foi enviado ao email!');
            return response()->json(['msg' => $validator->errors()->first()], 400);
        }

        if($saveCode['code'] == 2){
            $validator->errors()->add('email', 'Conta não encontrada');
            return response()->json(['msg' => $validator->errors()->first()], 400);
        }

        if($saveCode['code'] == 0){

            // Registra a conta prévia

            return response()->json(['msg' => 'Sua conta foi ativada e pré-registrada em nosso banco de dados!'], 200);
        }
    }
}
