<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/12
 * Time: 13:40
 */

namespace App\HttpController\Client;


use App\HttpController\Service\ClientOlService;
use App\HttpController\Service\CookService;

class Cook extends Base
{
    public function cook()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $ids = isset($data['ids'])?trim($data['ids']):'';
            $ids = json_decode($ids,true);
            if(empty($userId) or empty($token) or !is_array($ids))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50000,'','用户验证失败');


            $res = CookService::getInstance()->cook($userId,$ids);
            if($res['code'])
            {
                switch($res['code'])
                {
                    case 1:
                        return $this->json_return(50001,'','道具数量不足');
                    case 2:
                        return $this->json_return(50002,'','无法合成道具');
                    case 3:
                        return $this->json_return(50003,'','烹饪失败');
                }
            }
            return $this->json_return(200,$res);

        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }
}