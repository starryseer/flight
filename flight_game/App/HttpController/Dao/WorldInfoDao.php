<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/17
 * Time: 16:05
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use App\HttpController\Model\WorldInfoModel;

class WorldInfoDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get()
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client){

                $worldInfoModel = WorldInfoModel::invoke($client);
                $worldInfoModel = $worldInfoModel->where('date_str',date('Y-m-d'));
                $worldInfo = $worldInfoModel->get();
                if(!empty($worldInfo))
                    return $worldInfo->toArray();

                return [];
            });
        }
        catch(\Exception $e)
        {

            return false;
        }
    }
}