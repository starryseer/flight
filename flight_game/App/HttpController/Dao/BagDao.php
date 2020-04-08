<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/10
 * Time: 17:45
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use App\HttpController\Model\BagModel;
use EasySwoole\Mysqli\QueryBuilder;

class BagDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId){

                $bagModel = BagModel::invoke($client);
                $bag = $bagModel->get($userId);
                if(!empty($bag))
                    return $bag->toArray();
                else
                {
                    $info = [
                        'client_id'=>$userId,
                        'max_set'=>intval(__CONF__['bag']['init']['value']),
                        'create_time'=>date('Y-m-d H:i:s'),
                        'last_time'=>date('Y-m-d H:i:s'),
                    ];
                    $bagModel = BagModel::invoke($client,$info);
                    $bagModel->save();
                    return $info;
                }
            });
        }
        catch(\Exception $e)
        {

            return false;
        }
    }

    public function up($userId)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId){

                $bagModel = BagModel::invoke($client);
                $bagModel = $bagModel->where('client_id',$userId);
                $bagModel->update([
                    'max_set' => QueryBuilder::inc(__CONF__['bag']['increase']['value'])
                ]);
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }
}