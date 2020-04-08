<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/12
 * Time: 15:41
 */

namespace App\HttpController\Service;


use App\HttpController\Dao\ItemDao;
use App\HttpController\Common\MoodHelper;

class CookService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function cook($userId,$ids)
    {
        $res = ['code'=>0,'consume'=>[],'get'=>[],'clientAttr'=>[]];
        $items = ItemDao::getInstance()->getMulti($userId,$ids);
        if(count($items) != count($ids))
        {
            $res['code'] = 1;
            return $res;
        }

        $itemIds = [];
        foreach($items as $i)
        {
            $itemIds[] = $i['item_id'];
        }
        sort($itemIds);
        $idsStr = implode(',',$itemIds);
        $cookConf = __CONF__['cook'];
        if(!isset($cookConf[$idsStr]))
        {
            $res['code'] = 2;
            return $res;
        }

        $cookItemId = $cookConf[$idsStr]['merge'];

        foreach($items as &$item)
        {
            if($item['num'] <= 0)
            {
                $res['code'] = 3;
                return $res;
            }
            $item['num']-=1;
        }

        $cookId = ItemDao::getInstance()->getByItemIds($userId,[$cookItemId]);
        $clientAttr = ClientAttrService::getInstance()->get($userId);
        $num = MoodHelper::cookExtra($clientAttr['mood']);
        if(empty($cookId) or !__CONF__['item'][$cookItemId]['stack'])
            $cookItem = ['control'=>'insert','item_id'=>$cookItemId,'num'=>$num,'stack'=>__CONF__['item'][$cookItemId]['stack'],'expire'=>__CONF__['item'][$cookItemId]['expire'],'type'=>__CONF__['item'][$cookItemId]['type']];
        else
            $cookItem = ['control'=>'update','item_id'=>$cookItemId,'num'=>$num,'id'=>$cookId[0]['id']];

        $id = ItemDao::getInstance()->cook($userId,$items,$cookItem);
        if(!$id)
        {
            $res['code'] = 3;
            return $res;
        }

        $updateMood = MoodHelper::cookMood($clientAttr['mood']);
        $clientAttr['mood'] = $updateMood;
        ClientAttrService::getInstance()->set($userId,'mood',$updateMood);

        $cookItem = ItemDao::getInstance()->getOne($userId,$id);
        $res['consume'] = $items;
        $res['get'] = $cookItem;
        $res['clientAttr'] = $clientAttr;
        return $res;

    }

}