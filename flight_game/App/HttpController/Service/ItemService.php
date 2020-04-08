<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/6
 * Time: 9:53
 */

namespace App\HttpController\Service;

use App\HttpController\Common\MoodHelper;
use App\HttpController\Dao\ItemDao;

class ItemService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function getAll($userId)
    {
        $itemDao = ItemDao::getInstance();
        $items = $itemDao->getAll($userId);
        if(empty($items))
            return $items;

        $expireIds = $this->expireAll($items);
        if(!empty($expireIds))
        {
            $itemDao->delete($userId,array_values($expireIds));
            $items = array_values($items);
        }

        return $items;
    }

    public function getByItemIds($userId,$itemIds)
    {
        $itemDao = ItemDao::getInstance();
        $dbItems = $itemDao->getByItemIds($userId,$itemIds);
        $dbItems = $this->mergeItems($dbItems,$userId,$itemIds);
        return $dbItems;
    }

    public function mergeItems($dbItems,$userId,$itemIds)
    {
        $itemConf = __CONF__['item'];
        $dbItemIds = array_column($dbItems,'item_id');
        $repeatTimes = array_count_values($dbItemIds);
        $repeatItemIds = [];
        foreach($repeatTimes as $itemId => $count)
        {
            if($count > 1 and $itemConf[$itemId]['stack'])
                array_push($repeatItemIds,$itemId);
        }
        if(count($repeatItemIds)>0)
        {
            $itemDao = ItemDao::getInstance();
            foreach($repeatItemIds as $re)
            {
                $reItems = $itemDao->getByItemIds($userId,[$re]);
                $reArr = array_column($reItems,'num','id');
                if($itemDao->merge($userId,$reArr) === false)
                    return false;
            }
            $dbItems = $itemDao->getByItemIds($userId,$itemIds);
        }

        return $dbItems;
    }

    public function consume($userId,$id,$num,$selectId)
    {
        $res = ['code'=>0,'consume'=>[],'get'=>[],'show'=>[],'clientAttr'=>[]];
        $itemConf = __CONF__['item'];
        $itemDao = ItemDao::getInstance();
        $dbConsumeItem = $itemDao->getOne($userId,$id);
        if(empty($dbConsumeItem) or $dbConsumeItem['num'] < $num or !isset($itemConf[$dbConsumeItem['item_id']]))
        {
            $res['code'] = 1;
            return $res;
        }

        if($itemConf[$dbConsumeItem['item_id']]['type'] == 'debris' and $num != $itemConf[$dbConsumeItem['item_id']]['consume'])
        {
            $res['code'] = 1;
            return $res;
        }

        if($itemConf[$dbConsumeItem['item_id']]['type'] == 'multiBox' and $dbConsumeItem['times'] > 0 and time() > (strtotime($dbConsumeItem['update_time']) + strtotime($itemConf[$dbConsumeItem['item_id']]['lockTime'])))
        {
            $res['code'] = 6;
            return $res;
        }

        if($this->isExpire($dbConsumeItem))
        {
            $res['code'] = 2;
            return $res;
        }

        if(!$this->isConsume($dbConsumeItem['item_id'],$dbConsumeItem['num'],$selectId))
        {
            $res['code'] = 3;
            return $res;
        }

        if(in_array($itemConf[$dbConsumeItem['item_id']]['type'],['selectBox','food']))
            $num = 1;

        $getItems = $this->getItemIds($dbConsumeItem['item_id'],$num,$selectId,$dbConsumeItem['times'],$userId);

        if(!$this->outBag($userId,$getItems))
        {
            $res['code'] = 7;
            return $res;
        }

        $consumeItem = $this->consumeItemId($dbConsumeItem['id'],$dbConsumeItem['item_id'],$dbConsumeItem,$num);

        $dbItems = $this->getByItemIds($userId,array_keys($getItems));
        if($dbItems === false)
        {
            $res['code'] = 4;
            return $res;
        }

        $clientAdd = [];
        $itemAdd = [];
        $dbItem = array_column($dbItems,'num','item_id');
        $dbIds = array_column($dbItems,'id','item_id');
        $dbItemIds = array_keys($dbItem);
        foreach($getItems as $itemId => $itemArr)
        {
            if($itemId <= 3)
                $clientAdd[$itemId] = $itemArr;
            else {
                if (in_array($itemId, $dbItemIds) and $itemArr['stack'])
                {
                    $itemArrNow = $itemArr;
                    $itemArrNow['control'] = 'update';
                    $itemArrNow['num']+=$dbItem[$itemId];
                    $itemArrNow['id'] = $dbIds[$itemId];
                    $itemAdd[$itemId] = $itemArrNow;
                }
                else
                {
                    $itemArrNow = $itemArr;
                    $itemArrNow['control'] = 'insert';
                    $itemAdd[$itemId] = $itemArrNow;
                }
            }
        }

        $ids = ItemDao::getInstance()->consume($userId,$consumeItem,$itemAdd);
        if(false === $ids)
        {
            $res['code'] = 5;
            return $res;
        }

        $clientAttrService = ClientAttrService::getInstance();
        $clientAttr = $clientAttrService->get($userId);
        if(count($clientAdd) >0)
        {
            $attr = [];
            foreach($clientAdd as $key => $count)
            {
                switch($key)
                {
                    case 0:
                        $clientAttr['fatigue']+=$count['num'];
                        $attr['fatigue'] = $clientAttr['fatigue'];
                        break;
                    case 1:
                        $clientAttr['gold']+=$count['num'];
                        $attr['gold'] = $clientAttr['gold'];
                        break;
                    case 2:
                        $clientAttr['diamond']+=$count['num'];
                        $attr['diamond'] = $clientAttr['diamond'];
                        break;
                }
            }
            $clientAttrService->setMulti($userId,$attr);
        }

        $dbConsumeItem['num'] =$consumeItem['num'];
        if(isset($consumeItem['times']))
            $dbConsumeItem['times'] =$consumeItem['times'];
        $res['get'] = empty($ids)?$ids:ItemDao::getInstance()->getMulti($userId,$ids);
        $res['consume'] = $dbConsumeItem;
        $res['clientAttr'] = $clientAttr;
        $res['show'] = $getItems;
        return $res;
    }

    public function outBag($userId,$getItems)
    {
        $preNum = 0;
        foreach($getItems as $items)
        {
            if($items['item_id'] <= 4)
                continue;
            if($items['stack'] == 1)
                $preNum+=1;
            else
                $preNum+=$items['num'];
        }
        $maxNum = BagService::getInstance()->get($userId)['max_set'];
        $nowNum = ItemDao::getInstance()->count($userId);
        if(($preNum+$nowNum)>$maxNum)
            return false;
        else
            return true;
    }

    public function consumeItemId($id,$item_id,$db,$num)
    {
        $conf = __CONF__['item'][$item_id];
        if($conf['type'] == 'multiBox')
        {
            if($conf['times'] == ($db['times'] + 1) )
                return ['id'=>$id,'expire'=>$conf['expire'],'stack'=>$conf['stack'],'item_id'=>$item_id,'num'=>0];
            else
                return ['id'=>$id,'expire'=>$conf['expire'],'stack'=>$conf['stack'],'item_id'=>$item_id,'num'=>1,'times'=>($db['times']+1)];
        }
        else
            return ['id'=>$id,'expire'=>$conf['expire'],'stack'=>$conf['stack'],'item_id'=>$item_id,'num'=>$db['num']-$num];
    }

    public function getItemIds($itemId,$num,$selectId,$times,$userId)
    {
        $itemConf = __CONF__['item'];
        $conf = $itemConf[$itemId];
        switch($conf['type'])
        {
            case 'box':
                return $this->boxItem($itemId,$num);
            case 'randBox':
                return $this->randItem($itemId,$num);
            case 'selectBox':
                return $this->selectItem($itemId,$selectId);
            case 'debris':
                return $this->debrisItem($itemId);
            case 'multiBox':
                return $this->multiItem($itemId,$times);
            case 'food':
                return $this->food($itemId,$userId);
        }
    }

    public function multiItem($itemId,$times)
    {
        $getItems = [];
        $itemConf = __CONF__['item'];
        $conf = $itemConf[$itemId];
        if($conf['award'][$times] <=4)
            $getItems[$conf['award'][$times]] = ['item_id'=>$conf['award'][$times],'num'=>$conf['num'][$times]];
        else
            $getItems[$conf['award'][$times]] = ['expire'=>$itemConf[$conf['award'][$times]]['expire'],'stack'=>$itemConf[$conf['award'][$times]]['stack'],'item_id'=>$conf['award'][$times],'num'=>$conf['num'][$times],'type'=>$itemConf[$conf['award'][$times]]['type'],'times'=>$itemConf[$conf['award'][$times]]['times'],'use'=>$times];
        return $getItems;
    }

    public function boxItem($itemId,$num)
    {
        $getItems = [];
        $itemConf = __CONF__['item'];
        $conf = $itemConf[$itemId];
        foreach($conf['award'] as $key => $award)
        {
            if($conf['award'][$key] <=4)
                $getItems[$conf['award'][$key]] = ['item_id'=>$conf['award'][$key],'num'=>$num*$conf['num'][$key]];
            else
                $getItems[$conf['award'][$key]] = ['expire'=>$itemConf[$conf['award'][$key]]['expire'],'stack'=>$itemConf[$conf['award'][$key]]['stack'],'item_id'=>$conf['award'][$key],'num'=>$num*$conf['num'][$key],'type'=>$itemConf[$conf['award'][$key]]['type']];
        }
        return $getItems;
    }

    public function randItem($itemId,$num)
    {
        $rateMax = 0;
        $index = 0;
        $rateArr = [];
        $randArr = [];
        $itemList = [];
        $retList = [];
        $itemConf = __CONF__['item'];
        $consumeConf = $itemConf[$itemId];
        foreach($consumeConf['rate'] as $key => $rate)
        {
            $rateMax+=$rate;
            array_push($rateArr,$rateMax);
        }

        foreach($consumeConf['award'] as $key => $award)
        {
            $itemList[$key] = 0;
        }

        for($i=0;$i<$num;$i++)
        {
            array_push($randArr,rand(1,$rateMax));
        }
        sort($randArr);

        foreach($randArr as $r)
        {
            while($r > $rateArr[$index]) {
                $index++;
            }
            $itemList[$index]++;
        }

        foreach($itemList as $key => $count)
        {
            if($count == 0)
                continue;
            if($consumeConf['award'][$key] <= 3)
                $retList[$consumeConf['award'][$key]] = ['num'=>$consumeConf['num'][$key]*$count,'item_id'=>$consumeConf['award'][$key]];
            else
                $retList[$consumeConf['award'][$key]] = ['expire'=>$itemConf[$consumeConf['award'][$key]]['expire'],'stack'=>$itemConf[$consumeConf['award'][$key]]['stack'],'num'=>$consumeConf['num'][$key]*$count,'item_id'=>$consumeConf['award'][$key],'type'=>$itemConf[$consumeConf['award'][$key]]['type']];
        }

        return $retList;
    }

    public function selectItem($itemId,$selectId)
    {
        $itemConf = __CONF__['item'];
        $consumeConf = $itemConf[$itemId];
        $key = array_search($selectId,$consumeConf['award']);
        return [$consumeConf['award'][$key]=>['expire'=>$itemConf[$consumeConf['award'][$key]]['expire'],'stack'=>$itemConf[$consumeConf['award'][$key]]['stack'],'item_id'=>$consumeConf['award'][$key],'num'=>$consumeConf['num'][$key],'type'=>$itemConf[$consumeConf['award'][$key]]['type']]];
    }

    public function debrisItem($itemId)
    {
        $itemConf = __CONF__['item'];
        $consumeConf = $itemConf[$itemId];
        $retList = [];
        foreach($consumeConf['award'] as $key => $award)
        {
            $retList[$award] = ['expire'=>$itemConf[$award]['expire'],'stack'=>$itemConf[$award]['stack'],'num'=>$consumeConf['num'][$key],'item_id'=>$award];
        }
        return $retList;
    }

    public function food($itemId,$userId)
    {
        $mood = ItemService::getInstance()->get($userId);
        $moodId = MoodHelper::getMoodConf($mood);
        $itemConf = __CONF__['item'];
        $consumeConf = $itemConf[$itemId];
        $retList = [];
        foreach($consumeConf['award'] as $key => $award)
        {
            $retList[$consumeConf['award'][$key]] = ['num'=>$consumeConf['num'][$moodId-1],'item_id'=>$consumeConf['award'][$key]];
        }
        return $retList;
    }

    public function expireAll(&$items)
    {
        $itemConf = __CONF__['item'];
        $expireId = array_filter(array_map(function ($item)use($itemConf) {
            if($item['expire'] ==1 and (time() >= $itemConf[$item['item_id']]['endTime']))
                return $item['id'];
        }, $items));

        array_map(function ($key)use(&$items) {
            unset($items[$key]);
        },array_keys($expireId));

        return $expireId;
    }

    public function isExpire($item)
    {
        $itemConf = __CONF__['item'];
        if($item['expire'] == 1 and $itemConf[$item['item_id']]['endTime'] <= time())
            return true;

        return false;
    }

    public function isConsume($itemId,$num,$selectId)
    {
        $itemConf = __CONF__['item'];
        $conf = $itemConf[$itemId];
        switch($conf['type'])
        {
            case 'selectBox':
                if(!in_array($selectId,$conf['award']))
                    return false;
                break;
            case 'debris':
                if($conf['consume'] > $num)
                    return false;
                break;
            case 'other':
                return false;
                break;
        }

        return true;

    }

    public function sale($userId,$id,$num)
    {
        $res = ['code'=>0,'clientAttr'=>[],'item'=>[]];
        $itemConf = __CONF__['item'];
        $itemDao = ItemDao::getInstance();
        $item = $itemDao->getOne($userId,$id);
        if($item['num'] < $num or !$itemConf[$item['item_id']]['sale'])
        {
            $res['code'] = 1;
            return $res;
        }

        $item['num']-=$num;
        if(!ItemDao::getInstance()->sale($userId,$id,$item['num']))
        {
            $res['code'] = 2;
            return $res;
        }

        $clientAttrService = ClientAttrService::getInstance();
        $clientAttr = $clientAttrService->get($userId);
        $clientAttr['gold']+=$itemConf[$item['item_id']]['sale']*$num;
        $clientAttrService->set($userId,'gold',$clientAttr['gold']);

        $res['clientAttr'] = $clientAttr;
        $res['item'] = $item;
        return $res;
    }

}