<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/10
 * Time: 16:05
 */

namespace App\HttpController\Client;

use App\HttpController\Service\ClientOlService;
use App\HttpController\Service\ClientAttrService;

class ClientAttr extends Base
{
    public function setNickname()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token    = isset($data['token'])?trim($data['token']):'';
            $nickname = isset($data['nickname'])?trim($data['nickname']):'';
            if(empty($userId) or empty($token) or empty($nickname))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50001,'','用户验证失败');

            $clientAttr = ClientAttrService::getInstance()->get($userId);

            if(!empty($clientAttr['nickname']))
                return $this->json_return(50002,'','你已经设置昵称');

            if(!ClientAttrService::getInstance()->set($userId,'nickname',$nickname))
                return $this->json_return(50003,'','设置昵称失败');

            $clientAttr['nickname'] = $nickname;

            return $this->json_return(200,['clientAttr'=>$clientAttr]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function setSignature()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token    = isset($data['token'])?trim($data['token']):'';
            $signature = isset($data['signature'])?trim($data['signature']):'';
            if(empty($userId) or empty($token) or empty($signature))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50001,'','用户验证失败');

            $clientAttr = ClientAttrService::getInstance()->get($userId);

            if(!ClientAttrService::getInstance()->set($userId,'signature',$signature))
                return $this->json_return(50002,'','设置签名失败');

            $clientAttr['signature'] = $signature;

            return $this->json_return(200,['clientAttr'=>$clientAttr]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }
}