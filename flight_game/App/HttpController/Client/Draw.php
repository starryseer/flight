<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/12
 * Time: 17:24
 */

namespace App\HttpController\Client;

use App\HttpController\Service\ClientOlService;
use App\HttpController\Service\DrawService;

class Draw extends Base
{
    public function draw()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $type = isset($data['type'])?trim($data['type']):'';
            $pool = isset($data['pool'])?trim($data['pool']):'';
            if(empty($userId) or empty($token) or empty($type) or empty($pool) or !in_array($pool,array_keys(__CONF__['drawBanner'])) or !in_array($type,[1,10]))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50001,'','用户验证失败');

            $res = DrawService::getInstance()->draw($userId,$pool,$type);
            if($res['code'])
            {
                switch($res['code'])
                {
                    case 1:
                        return $this->json_return(50001,'','道具不足');
                    case 2:
                        return $this->json_return(50003,'','添加失败');
                }
            }

            unset($res['code']);
            return $this->json_return(200,$res);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }
}