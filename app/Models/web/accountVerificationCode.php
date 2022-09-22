<?php

namespace App\Models\web;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\AccountActivationMail;

class accountVerificationCode extends Model
{
    protected $connection = "web";
    protected $table = "accountVerificationCode";
    protected $primaryKey = "id";
    protected $dates = ["createdAt"];
    public $timestamps = false;
    protected $fillable = [
        "id", "email", "code","isActivated","createdAt"
    ];

    public static function CheckAccountIsActivated($email)
    {
        $findaccount = self::where('email', $email)->first();
        if($findaccount){
            if($findaccount->isActivated == 1){
                return 0;
            }
        }

        return 1;
    }

    public static function FindAccountByCode($email, $code)
    {
        $findaccount = self::where('email', $email)->where('code', $code)->first();
        if($findaccount){

            if($findaccount->isActivated == 1){
                return [
                    'minutes' => 0,
                    'code' => 0
                ];
            }

            $now = Carbon::now();
            $minutes = $now->diffInMinutes($findaccount->createdAt);
            if($minutes > 20)
            {
                Mail::to($findaccount->email)->send(new AccountActivationMail($findaccount));

                return [
                    'minutes' => 0,
                    'code' => 1
                ];

            }else{

                $findaccount->isActivated = 1;
                $findaccount->save();

                return [
                    'minutes' => 0,
                    'code' => 0
                ];
            }
        }

        return [
            'minutes' => 0,
            'code' => 2
        ];
    }

    public static function MakeNewActivationCode($email)
    {
        $ramdom = rand();

        $findaccount = self::where('email', $email)->first();
        if($findaccount){

            $now = Carbon::now();
            $minutes = $now->diffInMinutes($findaccount->createdAt);

            if($minutes < 20)
            {
                return [
                    'minutes' => 20 - $minutes,
                    'code' => 1
                ];
            }
               
            $findaccount->code = $ramdom;
            $findaccount->createdAt = $now;
            $findaccount->save();

            Mail::to($findaccount->email)->send(new AccountActivationMail($findaccount));

        }else{

            $account = new accountVerificationCode();
            $account->email = $email;
            $account->code = $ramdom;
            $account->isActivated = 0;
            $account->createdAt = now();
            $account->save();

            Mail::to($account->email)->send(new AccountActivationMail($account));
        }

        return [
            'minutes' => 0,
            'code' => 0
        ];
    }
}
