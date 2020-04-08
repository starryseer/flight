<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/10
 * Time: 17:43
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\BagDao;

class BagService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        return BagDao::getInstance()->get($userId);
    }

    public function up($userId)
    {
        return BagDao::getInstance()->up($userId);
    }
}