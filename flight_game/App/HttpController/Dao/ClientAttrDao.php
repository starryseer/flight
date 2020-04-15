<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/2
 * Time: 16:41
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use App\HttpController\Model\ClientAttrModel;

class ClientAttrDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function init($userId)
    {
        try
        {
            $info = [
                'client_id' => $userId,
                'gold' => 0,
                'diamond' => 0,
                'fatigue' =>0,
                'mood' =>0,
                'signature'=>NULL,
                'avatar'=>0,
            ];
            return DbManager::getInstance()->invoke(function ($client)use($info){
                $clientAttrModel = ClientAttrModel::invoke($client,$info);
                $clientAttrModel->save();
                $info['nickname'] = NULL;
                return $info;
            });
        }
        catch(\Exception $e)
        {
            var_dump($e->getMessage());
            return false;
        }
    }

    public function get($userId)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId){

                $clientAttrModel = ClientAttrModel::invoke($client);
                $clientAttrModel->where('client_id',$userId);
                $clientAttr = $clientAttrModel->get();
                if(empty($clientAttr))
                    return [];
                else
                    return $clientAttr->toArray();
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }


    public function set($userId,$key,$value)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId,$key,$value){
                $clientAttrModel = ClientAttrModel::invoke($client);
                $clientAttrModel->where('client_id',$userId);
                return $clientAttrModel->update([$key=>$value]);
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function setMulti($userId,$arr)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId,$arr){
                $clientAttrModel = ClientAttrModel::invoke($client);
                $clientAttrModel->where('client_id',$userId);
                return $clientAttrModel->update($arr);
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function getMulti($ids)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($ids){

                $clientAttrModel = ClientAttrModel::invoke($client);
                $clientAttrModel->where('client_id',$ids,'in');
                $clientAttr = $clientAttrModel->all();
                return $clientAttr;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }
}