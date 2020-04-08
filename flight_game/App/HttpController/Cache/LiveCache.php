<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/6/25
 * Time: 15:46
 */

namespace App\HttpController\Cache;

use EasySwoole\RedisPool\Redis;
use EasySwoole\EasySwoole\Logger;

class LiveCache
{
    public $table='live';
    public $table_sub='live_sub';

    public function addLive($log)
    {
        $key_name = $this->table.date('Ymd').":".$log['appID']."_".$log['channelID'];
        $sub_key_name = $this->table_sub.date('Ymd').":".$log['appID']."_".$log['channelID']."_".$log['subChannelID'];
        try
        {
            return Redis::invoker('redis',function ($redis) use ($key_name,$sub_key_name,$log){
                $redis->hset($key_name,$log['userID'],1);
                $redis->expire($key_name,86400*3);
                if($log['subChannelID'])
                {
                    $redis->hincrby($sub_key_name,$log['userID'],1);
                    $redis->expire($sub_key_name,86400*3);
                }
                return true;
            });

        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('addUserCache:line'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

}