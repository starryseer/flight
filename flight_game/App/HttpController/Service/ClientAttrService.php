<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/2
 * Time: 15:39
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\ClientAttrDao;
use App\HttpController\Service\MoodService;

class ClientAttrService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        MoodService::getInstance()->init($userId);
        FatigueService::getInstance()->natureUp($userId);
        return ClientAttrDao::getInstance()->get($userId);
    }

    public function set($userId,$key,$value)
    {
        return ClientAttrDao::getInstance()->set($userId,$key,$value);
    }

    public function setMulti($userId,$arr)
    {
        return ClientAttrDao::getInstance()->setMulti($userId,$arr);
    }

}