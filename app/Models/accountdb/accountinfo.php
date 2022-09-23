<?php

namespace App\Models\accountdb;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\web\accountinfoadd;
use DB;

class accountinfo extends Model
{
    protected $connection = "accountDb";
    protected $table = "account_info";
    protected $primaryKey = "accountDBID";
    protected $dates = ["registerTime","lastLoginTime"];
    public $timestamps = false;
    protected $fillable = [
        "accountDBID", "userName", "passWord","authKey","email","registerTime"
        ,"lastLoginTime","lastLoginIP","lastLoginServer","playTimeLast"
        ,"playTimeTotal","playCount","permission","privilege","language"
    ];

    protected $hidden = [
        'passWord'
    ];

    public function accountBans(){
        return $this->hasMany('App\Models\accountdb\accountbans','accountDBID');
    }

    public function accountInfoAdd(){
        return $this->hasMany('App\Models\web\accountinfoadd','accountDBID');
    }

    public static function FindAccountByEmail($email)
    {
        $data = self::where('email', $email)->first();
        if($data){
            return 'encontrado';
        }
        return 'não encontrado';
    }

    public static function RegisterAccount($input)
    {
        $db_tran = DB::connection('accountDb');
        $db_tran->beginTransaction();

        $db2_tran = DB::connection('web');
        $db2_tran->beginTransaction();

        try {

            $account = new accountinfo();
            $account->userName = $input['_name'];
            $account->passWord = hash("sha512",$input['_password']);
            $account->authKey = vsprintf('%s%s-%s-4000-8%.3s-%s%s%s0',str_split(dechex( microtime(true) * 1000 ) . bin2hex( random_bytes(8) ),4));
            $account->email = $input['_email'];
            $account->registerTime = now();
            $account->permission = 0;
            $account->privilege = 0;
            $account->save();

            $accountinfoAdd = new accountinfoadd();
            $accountinfoAdd->accountDBID = $account->accountDBID;
            $accountinfoAdd->email = $account->email;
            $accountinfoAdd->nationCode = $input['_nationCode'];;
            $accountinfoAdd->birthDate = $input['_birth'];;
            $accountinfoAdd->save();

            // $accountBan = new accountbans();
            // $accountBan->accountDBID = $account->accountDBID;
            // $accountBan->startTime = now();
            // $accountBan->endTime = now()->addDays(365);
            // $accountBan->ip = '';
            // $accountBan->description = 'Pending account activation';
            // $accountBan->active = 1;
            // $accountBan->save();
    
            $db_tran->commit();

            $db2_tran->commit();

            return 0;

        } catch (\Exception $e){
            // ROLLBACK
            $db_tran->rollback();
            $db2_tran->rollback();
            throw new \Exception($e);

            return -1;
        }
    }
}
