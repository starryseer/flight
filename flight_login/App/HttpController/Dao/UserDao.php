<?php

namespace App\HttpController\Dao;

use App\HttpController\Common\User;
use App\HttpController\Model\UserModel;
use EasySwoole\ORM\DbManager;

class UserDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function userByAccount($account)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($account){

                $userModel = UserModel::invoke($client);
                $userModel = $userModel->where('login_account',$account);
                $user = $userModel->get();
                if(empty($user))
                    return [];
                else
                    return $user->toArray();
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function updateToken($userID,$deviceType,$plat,$udid,$ip)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userID,$deviceType,$plat,$udid,$ip){
                $update = [
                    'last_devicetype'=>$deviceType,
                    'last_plat'=>$plat,
                    'last_udid'=>$udid,
                    'last_ip'=>$ip,
                    'token'=>User::userToken($userID)
                ];
                $userModel = UserModel::invoke($client);
                $userModel = $userModel->where('id',$userID);
                $res = $userModel->update($update);
                if($res)
                    return $update['token'];
                else
                    return false;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function addUser($account,$password,$deviceType,$plat,$udid,$ip)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client) use ($account,$password,$deviceType,$plat,$udid,$ip){
                $insert = [
                    'login_account'=>$account,
                    'login_pass'=>md5($password),
                    'create_devicetype'=>$deviceType,
                    'create_plat'=>$plat,
                    'create_udid'=>$udid,
                    'create_ip'=>$ip,
                ];
                $userModel = UserModel::invoke($client,$insert);
                $id = $userModel->save();
                if(!$id)
                    return false;
                $insert['id'] = $id;
                return $insert;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }


    public function userByToken($userId,$token)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client) use ($userId,$token){

                $userModel = UserModel::invoke($client);
                $userModel->where('id',$userId);
                $userModel->where('token',$token);
                $user = $userModel->get();
                if(empty($user))
                    return [];
                else
                    return $user->toArray();
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }
}
