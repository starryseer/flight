<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/20
 * Time: 15:15
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\ClientOlDao;

class ClientOlService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function addOl($userId,$token,$ip)
    {
        return ClientOlDao::getInstance()->addOl($userId,$token,$ip);
    }

    public function accessToken($userId,$token)
    {
        return ClientOlDao::getInstance()->accessToken($userId,$token);
    }
}