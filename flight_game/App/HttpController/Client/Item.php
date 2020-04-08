<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/6
 * Time: 9:51
 */

namespace App\HttpController\Client;

use App\HttpController\Service\BagService;
use App\HttpController\Service\ClientOlService;
use App\HttpController\Service\ItemService;

class Item extends Base
{
    public function getAll()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            if(empty($userId) or empty($token))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50001,'','用户验证失败');

            $item = ItemService::getInstance()->getAll($userId);
            $bag = BagService::getInstance()->get($userId);
            return $this->json_return(200,['item'=>$item,'bag'=>$bag]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

    public function consume()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $id = isset($data['id'])?trim($data['id']):'';
            $num = isset($data['num'])?trim($data['num']):'';
            $selectId = isset($data['selectId'])?trim($data['selectId']):'';
            if(empty($userId) or empty($token) or empty($id) or empty($num))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50000,'','用户验证失败');

            $res = ItemService::getInstance()->consume($userId,$id,$num,$selectId);
            if($res['code'])
            {
                switch($res['code'])
                {
                    case 1:
                        return $this->json_return(50001,'','道具不足');
                    case 2:
                        return $this->json_return(50002,'','道具到期');
                    case 3:
                        return $this->json_return(50003,'','类型错误');
                    case 4:
                        return $this->json_return(50004,'','获取失败');
                    case 5:
                        return $this->json_return(50005,'','使用失败');
                    case 6:
                        return $this->json_return(50006,'','时间未到');
                    case 7:
                        return $this->json_return(50007,'','超过背包上限');
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

    public function sale()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token = isset($data['token'])?trim($data['token']):'';
            $id = isset($data['id'])?trim($data['id']):'';
            $num = isset($data['num'])?trim($data['num']):'';

            if(empty($userId) or empty($token) or empty($id) or empty($num))
                return $this->json_return(49999,'','缺少参数');

            if(!ClientOlService::getInstance()->accessToken($userId,$token))
                return $this->json_return(50000,'','用户验证失败');

            $res = ItemService::getInstance()->sale($userId,$id,$num);
            if($res['code'])
            {
                switch($res['code'])
                {
                    case 1:
                        return $this->json_return(50001,'','道具数量不足');
                    case 2:
                        return $this->json_return(50002,'','道具使用失败');
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