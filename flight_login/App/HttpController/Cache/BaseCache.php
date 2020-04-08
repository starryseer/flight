<?php
/**
 * Created by PhpStorm.
 * User: Tioncico
 * Date: 2019/4/11 0011
 * Time: 14:40
 */

namespace App\HttpController\Cache;
use EasySwoole\RedisPool\Redis;

class BaseCache{

    public function push($key,$data)
    {
        try{
            return Redis::invoker('redis',function ($redis) use ($key,$data){
                $redis->rpush($key, $data);
                return true;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }


    public function increase($date_str, $stats_count, $stats_type, $stats_channel = NULL)
    {
        try{
            return Redis::invoker('redis',function ($redis) use ($date_str, $stats_count, $stats_type, $stats_channel){
                $key = $this->table.$date_str.':' .$stats_type;
                $redis->hincrby($key,'total',$stats_count);
                if($stats_channel)
                    $redis->hincrby($key,$stats_channel,$stats_count);
                $redis->expire($key, 86400 * 7);
                return true;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function increase_stats($date_str, $stats_count, $stars_count_column, $stats_table, $other=[])
    {
        try{
                $column = [];
                $column_str = '';
                foreach($other as $key => $value)
                {
                    $column[$key] = $value;
                }
                ksort($column);
                foreach($column as $k => $v)
                {
                    $column_str.= "{$k}={$v}|";
                }
                $redis_key = 'stats_table_'.$date_str. '_'.$stats_table. ':'.$stars_count_column;
                return Redis::invoker('redis',function ($redis) use ($redis_key,$column_str,$stats_count){
                    $redis->hincrby($redis_key, $column_str, $stats_count);
                    $redis->expire($redis_key, 86400 * 7);
                    return true;
                });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

}