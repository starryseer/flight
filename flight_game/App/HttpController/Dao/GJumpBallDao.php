<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/10
 * Time: 14:11
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use EasySwoole\EasySwoole\Logger;
use App\HttpController\Model\GJumpBallModel;
use EasySwoole\Mysqli\QueryBuilder;

class GJumpBallDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($userId)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId){
            try {
                $gJumpBallModel = GJumpBallModel::invoke($client);
                $gJumpBallModel->where('client_id', $userId);
                $gJumpBall = $gJumpBallModel->get();
                if (empty($gJumpBall))
                    return 0;
                else
                    return $gJumpBall->point;
            }
            catch(\Exception $e)
            {
                return 0;
            }
        });
    }

    public function play($userId,$point)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId,$point){
            try {
                $maxPoint = 0;
                $gJumpBallModel = GJumpBallModel::invoke($client);
                $gJumpBallModel->where('client_id', $userId);
                $gJumpBall = $gJumpBallModel->get();
                if (!empty($gJumpBall))
                    $maxPoint = $gJumpBall->point;

                if($point > $maxPoint)
                {
                    $time = 9999999999 - time();
                    $gJumpBallModel = GJumpBallModel::invoke($client);
                    $gJumpBallModel->func(function ($builder)use($userId,$point,$time){
                        $builder->raw("insert into `g_jump_ball` (`client_id`,`point`,`last_time`) values (?,?,?) on duplicate key update `point`=?,`last_time`=?",[$userId,$point,$time,$point,$time]);
                        return true;
                    });
                    $maxPoint = $point;
                }
                return $maxPoint;
            }
            catch(\Exception $e)
            {
                return 0;
            }
        });
    }

    public function rank($userId)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId){
            try {
                $point = 0;
                $time = 9999999999;
                $gJumpBallModel = GJumpBallModel::invoke($client);
                $gJumpBallModel->where('client_id', $userId);
                $gJumpBall = $gJumpBallModel->get();
                if(!empty($gJumpBall))
                {
                    $point = $gJumpBall->point;
                    $time = $gJumpBall->last_time;
                }


                $gJumpBallModel = GJumpBallModel::invoke($client);
                $gJumpBallModel->order('point', 'DESC');
                $gJumpBallModel->order('last_time', 'DESC');
                $gJumpBallModel->limit(10);
                $rankList = $gJumpBallModel->all();

                $gJumpBallModel = GJumpBallModel::invoke($client);
                $gJumpBallModel->where('point',$point,">");
                $count1 = $gJumpBallModel->count();

                $gJumpBallModel = GJumpBallModel::invoke($client);
                $gJumpBallModel->where('point',$point);
                $gJumpBallModel->where('last_time',$time,">");
                $count2 = $gJumpBallModel->count();

                return ['rankList'=>$rankList,'rank'=>($count1+$count2+1),'point'=>$point];
            }
            catch(\Exception $e)
            {
                return [];
            }
        });
    }
}