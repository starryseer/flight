<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/10
 * Time: 13:52
 */

namespace App\HttpController\Service;


class MiniGameService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        $miniGame = [];
        $miniGameConf = __CONF__['miniGame'];
        foreach($miniGameConf as $gameC)
        {
            $dao = "\\App\\HttpController\\Dao\\".$gameC['table']."Dao";
            $miniGame[$gameC['id']] = ['gameId'=>$gameC['id'],'point'=>$dao::getInstance()->get($userId)];
        }
        return $miniGame;
    }

    public function play($userId,$gameId,$point)
    {
        $table = __CONF__['miniGame'][$gameId]['table'];
        $dao = "\\App\\HttpController\\Dao\\".$table."Dao";
        $point = $dao::getInstance()->play($userId,$point);
        return ['gameId'=>$gameId,'point'=>$point];
    }

    public function rank($userId,$gameId)
    {
        $table = __CONF__['miniGame'][$gameId]['table'];
        $dao = "\\App\\HttpController\\Dao\\".$table."Dao";
        $rank= $dao::getInstance()->rank($userId);
        return $rank;
    }
}