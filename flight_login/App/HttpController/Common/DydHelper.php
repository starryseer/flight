<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/8/28
 * Time: 13:36
 */

namespace App\HttpController\Common;


class DydHelper
{
    public static $DYDSECRET_APPKEY = '';
    public static $DYDSECRET_URL = '';
    public static $DYD_CHANNEL = 1;
    public static $DYD_PAY_SECRET =
"-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwEjyhZ9ZmaENkardtnCg
w2M0JbNLGuvmQwezY5ML6TUAl6VCgHG+iaAf8nTyMXr6c2S4wvOBxFQiMTl48dFc
xVmGmHc9Dfif6YVc2j9lxVDuPUzhGCC0xtibmkKjaLkQpNnuzScQw0bp8znH5MFT
SBKfDBdsZoY1suWQNi3H/ChupeGkaSiLW6/GEvZWOrNQOD6ODVJ/gaO6W7BI0Dek
v3zCXTLV6t/ahMsFmLin14faPWHcTGYFYT7UE59a9tpEs8UA1gu0IZEJDtzrzn/4
C0C0E5MdcQkZ7j7SqCkPWvEC+6kX471VOHihGFR31MkLmPRDQQsPPbKidUj9o50C
tQIDAQAB
-----END PUBLIC KEY-----";

    public static function arrToString($data,$split='')
    {
        if(!is_array($data) or count($data)==0)
            return false;
        ksort($data);
        $str = '';
        foreach($data as $key => $value)
        {
            $str.= "{$key}={$value}{$split}";
        }

        if(strlen($split)>0)
            $str = substr($str,0,-1);
        return $str;
    }

    public static function md5($data, $secret , $split='')
    {
        $str = static::arrToString($data,$split);

        if(!$str)
            return false;

        $str.=$secret;

        return md5($str);
    }

    public static function rsa($sign_arr,$pub_key,$sign)
    {
        $data = static::arrToString($sign_arr,'&');
        if(!$data)
            return false;

        $sign = base64_decode($sign);
        $pub_key = "-----BEGIN PUBLIC KEY-----\n" .
            wordwrap($pub_key, 64, "\n", true) .
            "\n-----END PUBLIC KEY-----";
        $key = openssl_pkey_get_public($pub_key);
        $result = openssl_verify($data, $sign, $key, OPENSSL_ALGO_SHA1) === 1;
        return $result;
    }

    public static function paySign($sign_arr,$game,$sign,$sign_type)
    {
        if($sign_type == 'md5')
            return (static::md5($sign_arr,$game['appKey'],'&') ==$sign);
        else
            return static::rsa($sign_arr,$game['appRSAPubKey'],$sign);
    }

    public static function paySha256($content,$sign)
    {
        try{
            if(openssl_pkey_get_public(self::$DYD_PAY_SECRET) and openssl_verify($content,base64_decode($sign), self::$DYD_PAY_SECRET, "sha256WithRSAEncryption")){
                return true;
            }else{
                return false;
            }
        }
        catch(\Exception $e){
            return false;
        }
    }
}