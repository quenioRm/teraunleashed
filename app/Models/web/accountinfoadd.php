<?php

namespace App\Models\web;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class accountinfoadd extends Model
{
    protected $connection = "web";
    protected $table = "account_info_add";
    protected $primaryKey = "accountDBID";
    public $timestamps = false;
    protected $fillable = [
        "accountDBID", "email", "nationCode","birthDate"
    ];

    public function accountinfo(){
        return $this->belongsTo('App\Models\accountdb\accountinfo','accountDBID');
    }
}
