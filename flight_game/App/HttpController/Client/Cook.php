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
    public function index()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            if(empty($userId) or empty($token))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50000,'','用户验证失败');

            $res = CookService::getInstance()->get($userId);
            return $this->json_return(200,$res);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function unlock()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $kitchenId = isset($data['kitchenId'])?trim($data['kitchenId']):'';
            if(empty($userId) or empty($token))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50000,'','用户验证失败');

            $res = CookService::getInstance()->unlock($userId,$kitchenId);
            if($res['code'])
            {
                switch($res['code'])
                {
                    case 1:
                        return $this->json_return(50001,'','已解锁');
                    case 2:
                        return $this->json_return(50002,'','金币不足');
                    case 3:
                        return $this->json_return(50003,'','解锁失败');
                    case 4:
                        return $this->json_return(50003,'','请购买月卡');
                }
            }

            return $this->json_return(200,$res);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function start()
    {
        $data = $this->request()->getRequestParam();
        try {

            $menuId = isset($data['menuId'])?trim($data['menuId']):'';
            $kitchenId = isset($data['kitchenId'])?trim($data['kitchenId']):'';
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $itemIds = isset($data['itemIds'])?trim($data['itemIds']):'';
            $itemIds = json_decode($itemIds,true);
            if(empty($userId) or empty($token) or empty($kitchenId) or !is_array($itemIds) or !in_array($menuId,array_keys(__CONF__['menu'])))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50000,'','用户验证失败');


            $res = CookService::getInstance()->start($userId,$menuId,$kitchenId,$itemIds);
            if($res['code'])
            {
                switch($res['code'])
                {
                    case 1:
                        return $this->json_return(50001,'','数量不足');
                    case 2:
                        return $this->json_return(50002,'','无法合成道具');
                    case 3:
                        return $this->json_return(50003,'','烹饪失败');
                    case 4:
                        return $this->json_return(50003,'','烹饪位无法使用');
                }
            }
            return $this->json_return(200,$res);

        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function end()
    {
        $data = $this->request()->getRequestParam();
        try {
            $kitchenId = isset($data['kitchenId'])?trim($data['kitchenId']):'';
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            if(empty($userId) or empty($token) or empty($kitchenId))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50000,'','用户验证失败');

            $res = CookService::getInstance()->end($userId,$kitchenId);
            if($res['code'])
            {
                switch($res['code'])
                {
                    case 1:
                        return $this->json_return(50001,'','厨位错误');
                    case 2:
                        return $this->json_return(50002,'','时间未到');
                    case 3:
                        return $this->json_return(50003,'','获取物品失败');
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