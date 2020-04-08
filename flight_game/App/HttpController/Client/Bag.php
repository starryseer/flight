<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/10
 * Time: 18:03
 */

namespace App\HttpController\Client;

use App\HttpController\Service\BagService;
use App\HttpController\Service\ClientAttrService;
use App\HttpController\Service\ClientOlService;

class Bag extends Base
{
    public function upBag()
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
            if($clientAttr['diamond'] < __CONF__['bag']['cost']['value'])
                return $this->json_return(50002,'','钻石不足');

            $clientAttr['diamond']-=__CONF__['bag']['cost']['value'];
            ClientAttrService::getInstance()->set($userId,'diamond',$clientAttr['diamond']);
            $bag = BagService::getInstance()->get($userId);
            BagService::getInstance()->up($userId);
            $bag['max_set']+=__CONF__['bag']['increase']['value'];

            return $this->json_return(200,['bag'=>$bag,'clientAttr'=>$clientAttr]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }
}