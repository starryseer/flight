<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/2
 * Time: 15:25
 */

namespace App\HttpController\Client;

use App\HttpController\Service\ClientOlService;
use App\HttpController\Service\ClientAttrService;

class Fatigue extends Base
{
    public function natureUp()
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

            return $this->json_return(200,['clientAttr'=>$clientAttr]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

}