<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/6/25
 * Time: 10:50
 */

namespace App\HttpController\Cache;

use EasySwoole\RedisPool\Redis;
use EasySwoole\EasySwoole\Logger;

class UserRegCache
{
    public $table='user_reg:';
    public $table_sub='user_reg_sub:';

    public function addUser($user)
    {
        $key_name = $this->table.date('Ymd');
        $sub_key_name = $this->table_sub.date('Ymd');
        try
        {
            return Redis::invoker('redis',function ($redis) use ($key_name,$sub_key_name,$user){
                $redis->hincrby($key_name,$user['appID'].'_'.$user['channelID'],1);
                $redis->expire($key_name,86400*3);
                if($user['subChannelID'])
                {
                    $redis->hincrby($sub_key_name,$user['appID'].'_'.$user['channelID'].'_'.$user['subChannelID'],1);
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