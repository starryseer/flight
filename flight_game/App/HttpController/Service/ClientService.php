<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/20
 * Time: 14:48
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\ClientDao;

class ClientService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function getClient($userId)
    {
        return ClientDao::getInstance()->get($userId);
    }

    public function initClient($userId,$account,$channel,$ip)
    {
        return ClientDao::getInstance()->add($userId,$account,$channel,$ip);
    }
}