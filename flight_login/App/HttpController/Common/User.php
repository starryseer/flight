<?php

namespace App\HttpController\Common;

use EasySwoole\EasySwoole\Logger;

class User
{
    public static function enLoginToken($channelID,$userID,$time='')
    {
        try{
            if(empty($time))
                $time = time();
            return $channelID.','.$userID.','.$time.','.substr(hash_sha256($time.$channelID.$userID.self::$loginKey),0,8);
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('enLoginToken line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

    public static function deLoginToken($loginToken)
    {
        try{
            $tokenArr = explode(',',$loginToken);
            if(count($tokenArr) !== 4)
                return false;

            $channelID = $tokenArr[0];
            $userID = $tokenArr[1];
            $time = $tokenArr[2];
            $token = $tokenArr[3];

            if($token != static::enLoginToken($channelID,$userID,$time))
                return false;

            return $tokenArr;
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('enLoginToken line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

    public static function userToken($userID)
    {
        return md5($userID.time());
    }

    public static function isLoginAccount($str){
        if( !preg_match('/^[A-Z0-9_]{4,20}$/i', $str) ){
            return false;
        }
        return true;
    }
    public static function isLoginPass($str){
        if( !preg_match('/^[\w]{4,20}$/i',$str) ){
            return false;
        }else{
            return true;
        }
    }

    public static function isUserID($str){
        if( !preg_match('/^[1-9]{1}[0-9]*$/i', $str) ){
            return false;
        }
        return true;
    }
}
