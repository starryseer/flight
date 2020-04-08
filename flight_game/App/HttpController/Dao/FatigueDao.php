<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/2
 * Time: 15:52
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use App\HttpController\Model\FatigueModel;


class FatigueDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function init($userId)
    {
        try
        {
            $info = [
                'client_id' => $userId,
                'nature_time' => time(),
                'buy_day' => 0,
                'buy_count' =>0
            ];
            return DbManager::getInstance()->invoke(function ($client)use($info){

                $clientModel = FatigueModel::invoke($client,$info);
                $clientModel->save();
                return $info;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function get($userId)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId){

                $fatigueModel = FatigueModel::invoke($client);
                $fatigueModel->where('client_id',$userId);
                $fatigue = $fatigueModel->get();
                if(empty($fatigue))
                    return [];
                else
                    return $fatigue->toArray();
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
                $fatigueModel = FatigueModel::invoke($client);
                $fatigueModel->where('client_id',$userId);
                return $fatigueModel->update([$key=>$value]);
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }
}