<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/14
 * Time: 11:13
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use App\HttpController\Model\DrawBottomModel;

class DrawBottomDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId){

                $drawBottomModel = DrawBottomModel::invoke($client);
                $drawBottomModel->where('client_id',$userId);
                $drawBottom = $drawBottomModel->get();
                if(empty($drawBottom))
                {
                    $info = [
                        'client_id' => $userId,
                        'drawBasic' => 0,
                    ];
                    $drawBottomModel = DrawBottomModel::invoke($client,$info);
                    $drawBottomModel->save();
                    return $info;
                }
                else
                    return $drawBottom->toArray();
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }


    public function update($userId,$key,$value)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId,$key,$value){
                $drawBottomModel = DrawBottomModel::invoke($client);
                $drawBottomModel->where('client_id',$userId);
                return $drawBottomModel->update([$key=>$value]);
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }
}