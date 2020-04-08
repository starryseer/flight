<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/19
 * Time: 11:27
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\UserDao;

class AccountService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function login($account,$password,$deviceType,$plat,$udid,$ip)
    {
        $user = UserDao::getInstance()->userByAccount($account);
        if(empty($user) or $user['login_pass'] != md5($password) or !$user['status'])
            return false;

        $token = UserDao::getInstance()->updateToken($user['id'],$deviceType,$plat,$udid,$ip);
        if(empty($token))
            return false;
        $user['token'] = $token;
        return $user;
    }

    public function register($account,$password,$deviceType,$plat,$udid,$ip)
    {
        if(!empty(UserDao::getInstance()->userByAccount($account)))
            return false;

        $user = UserDao::getInstance()->addUser($account,$password,$deviceType,$plat,$udid,$ip);
        if(empty($user))
            return false;

        $token = UserDao::getInstance()->updateToken($user['id'],$deviceType,$plat,$udid,$ip);
        if(!$token)
            return false;

         $user['token'] = $token;
         return $user;
    }
}