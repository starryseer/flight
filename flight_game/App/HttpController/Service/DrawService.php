<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/13
 * Time: 9:53
 */

namespace App\HttpController\Service;

use App\HttpController\Common\DrawHelper;
use App\HttpController\Dao\ItemDao;
use App\HttpController\Dao\DrawBottomDao;
use App\HttpController\Dao\ClientAttrDao;

class DrawService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function draw($userId,$pool,$consumeNum)
    {
        $res = ['code'=>0,'consume'=>[],'get'=>[],'show'=>[]];
        $drawBannerConf = __CONF__['drawBanner'][$pool];
        $costItemId = $drawBannerConf['costItemId'];
        $costItem = [];
        $consumeItem = [];
        $clientAttr = ClientAttrDao::getInstance()->get($userId);
        if($costItemId == 1)
        {
            if($clientAttr['gold'] < $drawBannerConf['costNum'] * $consumeNum)
            {
                $res['code'] = 1;
                return $res;
            }
            $clientAttr['gold']-=$drawBannerConf['costNum'] * $consumeNum;
        }
        elseif($costItemId == 2)
        {
            if($clientAttr['diamond'] < $drawBannerConf['costNum'] * $consumeNum)
            {
                $res['code'] = 2;
                return $res;
            }
            $clientAttr['diamond']-=$drawBannerConf['costNum'] * $consumeNum;
        }
        else
        {
            $consumeItem = ItemService::getInstance()->getByItemIds($userId,[$costItemId]);
            if(count($consumeItem) == 0 or $consumeItem[0]['num'] < $consumeNum )
            {
                $res['code'] = 3;
                return $res;
            }
            $consumeItem[0]['num']-=$consumeNum;
            $consumeItem = $consumeItem[0];
            $costItem = ['id'=>$consumeItem[0]['id'],'num'=>$consumeItem[0]['num']];
        }


        $getNum = $consumeNum==10?11:$consumeNum;

        $drawItemIds = DrawHelper::rand($pool,$getNum);
        $bottomItemId = $this->bottom($userId,$pool,$consumeNum);
        if(false !== $bottomItemId)
        {
            array_pop($drawItemIds);
            array_push($drawItemIds,$bottomItemId);
        }
        $dbItems = ItemService::getInstance()->getByItemIds($userId,array_unique($drawItemIds));
        $dbItem = array_column($dbItems,'num','item_id');
        $dbIds = array_column($dbItems,'id','item_id');
        $drawItemIdsCount = array_count_values($drawItemIds);
        $getItem = [];
        foreach($drawItemIdsCount as $drawItemId => $num)
        {
            if(__CONF__['item'][$drawItemId]['stack'] == 0 or !isset($dbItem[$drawItemId]))
            {
                $getItem[$drawItemId] = ['control'=>'insert','stack'=>__CONF__['item'][$drawItemId]['stack'],'type'=>__CONF__['item'][$drawItemId]['type'],'expire'=>__CONF__['item'][$drawItemId]['expire'],'item_id'=>__CONF__['item'][$drawItemId]['id'],'num'=>$num];
            }
            else
            {
                $getItem[$drawItemId] = ['control'=>'update','id'=>$dbIds[$drawItemId],'num'=>($dbItem[$drawItemId]+$num),'stack'=>__CONF__['item'][$drawItemId]['stack']];
            }
        }

        $ids = ItemDao::getInstance()->consume($userId,$costItem,$getItem);
        if(false === $ids)
        {
            $res['code'] = 4;
            return $res;
        }

        if($costItemId == 1)
        {
            ClientAttrDao::getInstance()->set($userId,'gold',$clientAttr['gold']);
        }
        elseif($costItemId == 2)
        {
            ClientAttrDao::getInstance()->set($userId,'diamond',$clientAttr['diamond']);
        }

        $res['get'] = empty($ids)?$ids:ItemDao::getInstance()->getMulti($userId,$ids);
        $res['show'] = $drawItemIds;
        $res['consume'] = $consumeItem;
        $res['clientAttr'] = $clientAttr;
        return $res;
    }

    public function bottom($userId,$pool,$getNum)
    {
        if(!__CONF__['drawBanner'][$pool]['isBottom'])
            return false;

        $bottom = false;
        $drawBottom = DrawBottomDao::getInstance()->get($userId);
        if(($drawBottom[$pool]+$getNum)>=__CONF__['drawBanner'][$pool]['bottom'])
        {
            $num = $drawBottom[$pool]+$getNum - __CONF__['drawBanner'][$pool]['bottom'];
            $bottom = DrawHelper::rand( __CONF__['drawBanner'][$pool]['bottomPool'],1)[0];
        }
        else
        {
            $num = $drawBottom[$pool]+$getNum;
        }
        DrawBottomDao::getInstance()->update($userId,$pool,$num);
        return $bottom;
    }
}