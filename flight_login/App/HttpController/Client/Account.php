<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/19
 * Time: 10:52
 */

namespace App\HttpController\Client;

use App\HttpController\Service\AccountService;
use App\HttpController\Common\User;

class Account extends Base
{
    public function accountLogin()
    {
        $data = $this->request()->getRequestParam();
        try {

            $account = isset($data['account'])?trim($data['account']):'';
            $password    = isset($data['password'])?trim($data['password']):'';
            $deviceType    = isset($data['deviceType'])?trim($data['deviceType']):'';
            $plat    = isset($data['plat'])?trim($data['plat']):'';
            $udid    = isset($data['udid'])?trim($data['udid']):'';
            $ip = isset($this->request()->getHeader('x-real-ip')[0])?$this->request()->getHeader('x-real-ip')[0]:"";


            if(empty($account) or !User::isLoginAccount($account) or empty($password) or !User::isLoginPass($password)  or empty($deviceType) or empty($plat) or empty($udid))
                return $this->json_return(49999,'','缺少参数');

            if(!($user = AccountService::getInstance()->login($account,$password,$deviceType,$plat,$udid,$ip)))
                return $this->json_return(50001,'','账号或密码错误');

            unset($user['login_pass']);
            return $this->json_return(200,['user'=>$user]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function accountRegister()
    {
        $data = $this->request()->getRequestParam();
        try {

            $account = isset($data['account'])?trim($data['account']):'';
            $password    = isset($data['password'])?trim($data['password']):'';
            $deviceType    = isset($data['deviceType'])?trim($data['deviceType']):'';
            $plat    = isset($data['plat'])?trim($data['plat']):'';
            $udid    = isset($data['udid'])?trim($data['udid']):'';
            $ip = isset($this->request()->getHeader('x-real-ip')[0])?$this->request()->getHeader('x-real-ip')[0]:"";

            if(empty($account) or !User::isLoginAccount($account) or empty($password) or !User::isLoginPass($password) or empty($deviceType) or empty($plat) or empty($udid))
                return $this->json_return(49999,'','缺少参数');

            if(!($user = AccountService::getInstance()->register($account,$password,$deviceType,$plat,$udid,$ip)))
                return $this->json_return(50001,'','创建失败');

            unset($user['login_pass']);
            return $this->json_return(200,['user'=>$user]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }
}