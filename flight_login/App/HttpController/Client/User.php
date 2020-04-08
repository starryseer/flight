<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/2
 * Time: 14:27
 */

namespace App\HttpController\Client;

use App\HttpController\Service\UserService;

class User extends Base
{
    public function checkToken()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';

            if(empty($userId) or empty($token))
                return $this->json_return(49999,'','缺少参数');

            $user = UserService::getInstance()->checkToken($userId,$token);
            if(empty($user))
                return $this->json_return(50001,'','验证失败');

            unset($user['login_pass']);
            return $this->json_return(200,['user'=>$user]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }
}