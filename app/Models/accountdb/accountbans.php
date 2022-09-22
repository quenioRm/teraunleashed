<?php

namespace App\Models\accountdb;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class accountbans extends Model
{
    protected $connection = "accountDb";
    protected $table = "account_bans";
    protected $primaryKey = "accountDBID";
    protected $dates = ["startTime","endTime"];
    public $timestamps = false;
    protected $fillable = [
        "accountDBID", "startTime", "endTime","ip","description","active"
    ];

    public function accountinfo(){
        return $this->belongsTo('App\Models\accountdb\accountinfo','accountDBID');
    }
}
