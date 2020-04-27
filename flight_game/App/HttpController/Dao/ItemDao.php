<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/5
 * Time: 10:57
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use EasySwoole\Mysqli\QueryBuilder;

class ItemDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function getAll($userId)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId){
            $itemModel = null;
            $fen = $userId % 10;
            eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
            $itemModel->where('client_id',$userId);
            return $itemModel->all();

        });
    }

    public function getByItemIds($userId,$ids)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$ids){
            $itemModel = null;
            $fen = $userId % 10;
            eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
            $itemModel->where('client_id',$userId);
            $itemModel->where('item_id', $ids, 'in');
            return  $itemModel->all();
        });
    }

    public function getOne($userId,$id)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$id){
            $itemModel = null;
            $fen = $userId % 10;
            eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
            $item = $itemModel->get($id);
            if(!empty($item))
                return $item->toArray();
            return [];
        });
    }

    public function getMulti($userId,$ids)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$ids){
            $itemModel = null;
            $fen = $userId % 10;
            eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
            return $itemModel->all($ids);
        });
    }

    public function merge($userId,$arr)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$arr){
            \EasySwoole\ORM\DbManager::getInstance()->startTransaction($client);
            try{
                $updateModel = null;
                $deleteModel = null;
                $fen = $userId % 10;
                eval('$updateModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                eval('$deleteModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                $ids = array_keys($arr);
                $updateModel->where('id',$ids[0])->update(['num'=>array_sum($arr)]);
                unset($ids[0]);
                $deleteModel->destroy($ids);
                \EasySwoole\ORM\DbManager::getInstance()->commit($client);
            }catch (\Exception $e)
            {
                \EasySwoole\ORM\DbManager::getInstance()->rollback($client);
                return false;
            }
        });
    }

    public function consume($userId,$consumeItem,$getItems)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$consumeItem,$getItems){
            \EasySwoole\ORM\DbManager::getInstance()->startTransaction($client);
            try{
                $ids = [];
                $fen = $userId % 10;
                foreach($getItems as $itemId => $itemArr)
                {

                    if($itemArr['control'] == 'update' and $itemArr['stack'])
                    {
                        $itemModel = null;
                        eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                        $itemModel = $itemModel->where('id',$itemArr['id']);
                        $itemModel->update(['num'=>$itemArr['num']]);
                        $ids[]=$itemArr['id'];
                    }
                    elseif($itemArr['stack'])
                    {
                        $itemModel = null;
                        eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                        $insert = [
                            'client_id'=>$userId,
                            'item_id'=>$itemArr['item_id'],
                            'item_type'=>$itemArr['type'],
                            'num'=>$itemArr['num'],
                            'stack'=>$itemArr['stack'],
                            'expire'=>$itemArr['expire'],
                        ];
                        $itemModel = $itemModel->data($insert);
                        $ids[] = $itemModel->save();
                    }
                    else
                    {
                        for($i=1;$i<=$itemArr['num'];$i++)
                        {
                            $itemModel = null;
                            eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                            $insert = [
                                'client_id'=>$userId,
                                'item_id'=>$itemArr['item_id'],
                                'item_type'=>$itemArr['type'],
                                'num'=>1,
                                'stack'=>$itemArr['stack'],
                                'expire'=>$itemArr['expire'],
                            ];
                            $itemModel = $itemModel->data($insert);
                            $ids[] = $itemModel->save();
                        }
                    }
                }

                if(!empty($consumeItem))
                {
                    if($consumeItem['num'] == 0)
                    {
                        $itemModel = null;
                        eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                        $itemModel->destroy($consumeItem['id']);
                    }
                    else
                    {
                        $itemModel = null;
                        eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                        $itemModel = $itemModel->where('id',$consumeItem['id']);
                        if(isset($consumeItem['times']))
                            $itemModel->update(['times'=>$consumeItem['times']]);
                        else
                            $itemModel->update(['num'=>$consumeItem['num']]);
                    }
                }

                \EasySwoole\ORM\DbManager::getInstance()->commit($client);
                return $ids;
            }catch (\Exception $e)
            {
                \EasySwoole\ORM\DbManager::getInstance()->rollback($client);

                return false;
            }
        });
    }

    public function sale($userId,$id,$num)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$id,$num){
            try{
                $itemModel = null;
                $fen = $userId % 10;
                $res = false;
                eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                if($num == 0)
                    $res = $itemModel->destroy($id);
                else
                    $res = $itemModel->where(['id'=>$id])->update(['num'=>$num]);
                return $res;
            }catch (\Exception $e)
            {
                return false;
            }
        });
    }

    public function delete($userId,$ids)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$ids){
            try{
                $itemModel = null;
                $fen = $userId % 10;
                eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                $res = $itemModel->destroy($ids);
                return $res;
            }catch (\Exception $e)
            {
                return false;
            }
        });
    }


    public function count($userId)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId){
            try{
                $itemModel = null;
                $fen = $userId % 10;
                eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                $itemModel = $itemModel->where('client_id',$userId);
                return $itemModel->count();
            }catch (\Exception $e)
            {
                return false;
            }
        });
    }

    public function updateMulti($userId,$items)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$items){
            \EasySwoole\ORM\DbManager::getInstance()->startTransaction($client);
            try{
                $id = null;
                $fen = $userId % 10;
                foreach($items as $item)
                {
                    $itemModel = null;
                    eval('$itemModel=\App\HttpController\Model\Item'.$fen.'Model::invoke($client);');
                    if($item['num'] == 0)
                        $itemModel->destroy($item['id']);
                    else
                        $itemModel->where('id',$item['id'])->update(['num'=>$item['num']]);
                }
                \EasySwoole\ORM\DbManager::getInstance()->commit($client);
                return true;
            }catch (\Exception $e)
            {
                \EasySwoole\ORM\DbManager::getInstance()->rollback($client);

                return false;
            }
        });
    }
}