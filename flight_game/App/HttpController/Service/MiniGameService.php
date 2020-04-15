<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/10
 * Time: 13:52
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\ClientAttrDao;

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
        $ids = [];
        $rankList = [];
        foreach($rank['rankList'] as $r)
        {
            $ids[] = $r->client_id;
            $rankList[$r->client_id] = $r;
        }
        $clientAttr =ClientAttrDao::getInstance()->getMulti($ids);
        foreach($clientAttr as $attr)
        {
            $rankList[$attr->client_id]->nickname =  $attr->nickname;
            $rankList[$attr->client_id]->avatar =  $attr->avatar;
        }
        $rank['rankList'] = array_values($rankList);
        return $rank;
    }
}