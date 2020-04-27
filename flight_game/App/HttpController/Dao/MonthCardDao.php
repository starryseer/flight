<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/27
 * Time: 19:54
 */

namespace App\HttpController\Dao;

use App\HttpController\Model\MonthCardModel;

class MonthCardDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId){
            $monthCardModel = MonthCardModel::invoke($client);
            $monthCardModel->where('client_id',$userId);
            $monthCard = $monthCardModel->get();
            if(empty($monthCard))
                return [];
            return $monthCard->toArray();

        });
    }
}