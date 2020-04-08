<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/2
 * Time: 15:36
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\FatigueDao;
use App\HttpController\Dao\ClientAttrDao;
use EasySwoole\EasySwoole\Config;

class FatigueService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function natureUp($userId)
    {
        $clientAttr = ClientAttrDao::getInstance()->get($userId);
        if(empty($clientAttr))
            $clientAttr = ClientAttrDao::getInstance()->init($userId);

        $fatigue = FatigueDao::getInstance()->get($userId);
        if(empty($fatigue))
            $fatigue = FatigueDao::getInstance()->init($userId);

        $basicConf = __CONF__['basic'];
        $time = time();
        $up = intval(($time - $fatigue['nature_time'])/$basicConf['fatigue_interval']['value'])*$basicConf['fatigue_rate']['value'];
        if($up == 0)
            return;

        $rest = ($time - $fatigue['nature_time'])%$basicConf['fatigue_interval']['value'];
        if(!FatigueDao::getInstance()->set($userId,'nature_time',$time-$rest))
            return;

        if(!$fatigue)
            return;

        $maxConf = $basicConf['fatigue_max']['value'];
        $fatigueNow = min($maxConf,$up + $clientAttr['fatigue']);
        ClientAttrService::getInstance()->set($userId,'fatigue',$fatigueNow);
    }
}