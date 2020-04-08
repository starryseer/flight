<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/17
 * Time: 16:21
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\ClientAttrDao;
use App\HttpController\Dao\WorldInfoDao;

class MoodService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function init($userId)
    {
        $clientAttr = ClientAttrDao::getInstance()->get($userId);
        if(date('Y-m-d',strtotime($clientAttr['last_time'])) != date('Y-m-d'))
        {
            $worldInfo = WorldInfoDao::getInstance()->get();
            ClientAttrDao::getInstance()->set($userId,'mood',$worldInfo['mood']);
        }
    }

    public function get($userId)
    {
        $clientAttr = ClientAttrDao::getInstance()->get($userId);
        return $clientAttr['mood'];
    }
}