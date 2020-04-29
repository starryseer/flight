<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/12
 * Time: 15:41
 */

namespace App\HttpController\Service;


use App\HttpController\Dao\ClientAttrDao;
use App\HttpController\Dao\ItemDao;
use App\HttpController\Dao\KitchenDao;
use App\HttpController\Dao\MonthCardDao;
use App\HttpController\Common\MoodHelper;

class CookService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        $res = ['code'=>0,'kitchens'=>[]];
        $kitchens = KitchenDao::getInstance()->get('',$userId);
        if(count($kitchens) ==0)
        {
            $ids = KitchenDao::getInstance()->init($userId);
            $kitchens = KitchenDao::getInstance()->get($userId,$ids);
        }

        $unset = [];
        $monthCard = MonthCardDao::getInstance()->get($userId);
        foreach($kitchens as $key => $kitchen)
        {
            $config = __CONF__['kitchen'][$kitchen['kitchen_id']];
            if($config['type'] == 'month' and !$this->hasMonthCard($monthCard))
                $unset[] = $key;
        }

        if(count($unset) >0)
        {
            foreach($unset as $unKey)
            {
                unset($kitchens[$unKey]);
            }
        }

        $res['kitchens'] = $kitchens;
        return $res;
    }

    public function unlock($userId,$kitchenId)
    {
        $res = ['code'=>0,'kitchens'=>[],'clientAttr'=>[]];
        $kitchens = KitchenDao::getInstance()->get('',$userId);
        foreach($kitchens as $kitchen)
        {
            if($kitchen['kitchen_id'] == $kitchenId)
            {
                $res['code'] = 1;
                return $res;
            }
        }

        $clientAttr = ClientAttrDao::getInstance()->get($userId);
        $conf = __CONF__['kitchen'][$kitchenId];
        $kitchen = [];
        switch($conf['type'])
        {
            case "init":
                $kitchen = KitchenDao::getInstance()->add($userId,$kitchenId);
                if(empty($kitchen))
                {
                    $res['code'] = 3;
                    return $res;
                }
                break;
            case 'gold':
                if($clientAttr['gold'] < $conf['cost'])
                {
                    $res['code'] = 2;
                    return $res;
                }
                $kitchen = KitchenDao::getInstance()->add($userId,$kitchenId);
                if(empty($kitchen))
                {
                    $res['code'] = 3;
                    return $res;
                }
                $clientAttr['gold']-=$conf['cost'];
                ClientAttrDao::getInstance()->set($userId,'gold',$clientAttr['gold']);
                break;
            case 'month':
                $montCard = MonthCardDao::getInstance()->get($userId);
                if(!$this->hasMonthCard($montCard))
                {
                    $res['code'] = 4;
                    return $res;
                }
                $kitchen = KitchenDao::getInstance()->add($userId,$kitchenId);
                if(empty($kitchen))
                {
                    $res['code'] = 3;
                    return $res;
                }
                break;
        }

        $res['kitchen'] = $kitchen;
        $res['clientAttr'] = $clientAttr;
        return $res;
    }

    public function start($userId,$menuId,$kitchenId,$itemIds)
    {
        $res = ['code'=>0,'consume'=>[],'clientAttr'=>[]];
        $items = ItemDao::getInstance()->getMulti($userId,$itemIds);
        if(count($items) != count($itemIds))
        {
            $res['code'] = 1;
            return $res;
        }

        $itemConfIds = [];
        foreach($items as $i)
        {
            $itemConfIds[] = $i['item_id'];
        }
        sort($itemConfIds);
        $idsStr = implode(',',$itemConfIds);
        $menuConf = __CONF__['menu'][$menuId];
        if($menuConf['itemIds'] != $idsStr)
        {
            $res['code'] = 2;
            return $res;
        }

        foreach($items as &$item)
        {
            if($item['num'] <= 0)
            {
                $res['code'] = 1;
                return $res;
            }
            $item['num']-=1;
        }

        $kitchen = KitchenDao::getInstance()->get($kitchenId);
        $monthCard = MonthCardDao::getInstance()->get($userId);
        if(empty($kitchen) or $kitchen[0]['status'] != 0 or $kitchen[0]['client_id'] != $userId or (__CONF__['kitchen'][$kitchen[0]['kitchen_id']]['type'] == 'month' and !$this->hasMonthCard($monthCard)))
        {
            $res['code'] = 4;
            return $res;
        }

        $clientAttr = ClientAttrService::getInstance()->get($userId);
        if(!ItemDao::getInstance()->updateMulti($userId,$items))
        {
            $res['code'] = 3;
            return $res;
        }

        $kitchen[0]['status'] = 1;
        $kitchen[0]['menu_id'] = $menuId;
        $kitchen[0]['start_time'] = date('Y-m-d H:i:s');
        $kitchen[0]['acc_time'] = 0;
        KitchenDao::getInstance()->update($kitchenId,['status'=>1,'menu_id'=>$menuId,'start_time'=>$kitchen[0]['start_time'],'acc_time'=>0]);

        $updateMood = MoodHelper::cookMood($clientAttr['mood']);
        $clientAttr['mood'] = $updateMood;
        ClientAttrService::getInstance()->set($userId,'mood',$updateMood);

        $res['consume'] = $items;
        $res['clientAttr'] = $clientAttr;
        $res['kitchen'] = $kitchen[0];
        return $res;

    }

    public function end($userId,$kitchenId)
    {
        $res = ['code'=>0,'kitchen'=>[],'get'=>[]];
        $kitchen = KitchenDao::getInstance()->get($kitchenId);
        if($kitchen[0]['status'] == 0 or $kitchen[0]['client_id'] != $userId)
        {
            $res['code'] = 1;
            return $res;
        }

        $kitchen = $kitchen[0];
        $menuId = $kitchen['menu_id'];
        $menuConf = __CONF__['menu'][$menuId];
        if(time() < (strtotime($kitchen['start_time']) - $kitchen['acc_time'] + $menuConf['costTime']))
        {
            $res['code'] = 2;
            return $res;
        }

        $itemId = $menuConf['merge'];
        $item = ItemDao::getInstance()->getByItemIds($userId,[$itemId]);
        $itemConf = __CONF__['item'][$itemId];
        if(count($item) == 0)
        {
            $getItem = ['control'=>'insert','stack'=>$itemConf['stack'],'item_id'=>$itemId,'type'=>$itemConf['type'],'num'=>1,'expire'=>$itemConf['expire']];
        }
        else if($itemConf['stack'])
        {
            $getItem = ['control'=>'update','stack'=>$itemConf['stack'],'id'=>$item[0]->id,'num'=>$item[0]->num+1];
        }
        else
        {
            $getItem = ['control'=>'insert','stack'=>$itemConf['stack'],'item_id'=>$itemId,'type'=>$itemConf['type'],'num'=>1,'expire'=>$itemConf['expire']];
        }
        $ids = ItemDao::getInstance()->consume($userId,[],[$getItem]);
        if(false === $ids)
        {
            $res['code'] = 3;
            return $res;
        }

        $kitchen['status'] = 0;
        $kitchen['menu_id'] = 0;
        $kitchen['start_time'] = date('Y-m-d H:i:s');
        $kitchen['acc_time'] = 0;
        $kitchen['kitchen_id'] = 0;
        KitchenDao::getInstance()->update($kitchenId,['kitchen_id'=>0,'status'=>0,'menu_id'=>0,'start_time'=>date('Y-m-d H:i:s'),'acc_time'=>0]);

        $res['get'] = ItemDao::getInstance()->getMulti($userId,$ids);
        $res['kitchen'] = $kitchen;
        return $res;
    }

    public function hasMonthCard($monthCard)
    {
        return !empty($monthCard) and ($monthCard['num'] >0 or (strtotime($monthCard['last_time']) > strtotime(date("Y-m-d"))));
    }
}