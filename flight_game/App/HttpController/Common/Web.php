<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/20
 * Time: 14:27
 */

namespace App\HttpController\Common;


class Web
{
    public static function post($url,$params){
        try{
            $client = new \EasySwoole\HttpClient\HttpClient($url);
            $response = $client->post($params);
            return json_decode($response->getBody(),true);
        }
        catch (\Exception $e)
        {
            return false;
        }
    }
}