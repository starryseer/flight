<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/10
 * Time: 9:59
 */

namespace App\HttpController\Client;

use App\HttpController\Service\ClientOlService;
use App\HttpController\Service\ClientAttrService;
use App\HttpController\Service\MiniGameService;

class MiniGame extends Base
{
    public function index()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            if(empty($userId) or empty($token))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50001,'','用户验证失败');

            $clientAttr = ClientAttrService::getInstance()->get($userId);
            $miniGame = MiniGameService::getInstance()->get($userId);

            return $this->json_return(200,['miniGame'=>$miniGame,'clientAttr'=>$clientAttr]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function play()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $gameId = isset($data['gameId'])?trim($data['gameId']):'';
            $point = isset($data['point'])?trim($data['point']):'';
            if(empty($userId) or empty($token) or (empty($point) and $point != 0) or !in_array($gameId,array_keys(__CONF__['miniGame'])))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50001,'','用户验证失败');

            $miniGame = MiniGameService::getInstance()->play($userId,$gameId,$point);
            $clientAttr = ClientAttrService::getInstance()->get($userId);
            $clientAttr['gold']+= $point;
            ClientAttrService::getInstance()->set($userId,'gold',$clientAttr['gold']);

            return $this->json_return(200,['miniGame'=>$miniGame,'clientAttr'=>$clientAttr,'gold'=>$point]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function rank()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $gameId = isset($data['gameId'])?trim($data['gameId']):'';
            if(empty($userId) or empty($token) or !in_array($gameId,array_keys(__CONF__['miniGame'])))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50001,'','用户验证失败');

            $rank = MiniGameService::getInstance()->rank($userId,$gameId);
            if(empty($rank))
                return $this->json_return(50002,'','参数获取失败');

            return $this->json_return(200,$rank);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }
}