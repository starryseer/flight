<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/6/25
 * Time: 11:19
 */

namespace App\HttpController\Cache;

use App\HttpController\Common\Currency;
use EasySwoole\RedisPool\Redis;
use EasySwoole\EasySwoole\Logger;

class ChargeCache
{
    public $table='charge:';
    public $table_sub='charge_sub:';

    public function addCharge($order)
    {
        $key_name = $this->table.date('Ymd');
        $sub_key_name = $this->table_sub.date('Ymd');
        try
        {
            $incr_money = intval($order['money']/(in_array($order['currency'],array_keys(Currency::$currency))?Currency::$currency[$order['currency']]:1));
            return Redis::invoker('redis',function ($redis) use ($key_name,$sub_key_name,$order,$incr_money){
                $redis->hincrby($key_name,$order['appID'].'_'.$order['channelID'],$incr_money);
                $redis->expire($key_name,86400*3);
                if($order['subChannelID'])
                {
                    $redis->hincrby($sub_key_name,$order['appID'].'_'.$order['channelID'].'_'.$order['subChannelID'],$incr_money);
                    $redis->expire($sub_key_name,86400*3);
                }
                return true;
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('addChargeCache:line'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }


}