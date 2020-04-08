<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/6/25
 * Time: 11:08
 */

namespace App\HttpController\Cache;

use EasySwoole\RedisPool\Redis;
use EasySwoole\EasySwoole\Logger;

class DeviceRegCache
{
    public $table='device_reg:';
    public $table_sub='device_reg_sub:';

    public function addDevice($device)
    {
        $key_name = $this->table.date('Ymd');
        $sub_key_name = $this->table_sub.date('Ymd');
        try
        {
            return Redis::invoker('redis',function ($redis) use ($key_name,$sub_key_name,$device){
                $redis->hincrby($key_name,$device['appID'].'_'.$device['channelID'],1);
                $redis->expire($key_name,86400*3);
                if($device['subChannelID'])
                {
                    $redis->hincrby($sub_key_name,$device['appID'].'_'.$device['channelID'].'_'.$device['subChannelID'],1);
                    $redis->expire($sub_key_name,86400*3);
                }
                return true;
            });

        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('addDevice:line'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }
}