<?php

namespace App\HttpController\Cache;

use EasySwoole\RedisPool\Redis;
use EasySwoole\EasySwoole\Logger;

class EmailCache
{
    public $table='email_queue';

    public function queue($log)
    {
        try
        {
            return Redis::invoker('redis',function ($redis) use ($log){
                $redis->rpush($this->table,json_encode($log,true));
                return true;
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('email_queue:line'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

    public function set($email)
    {
        try
        {
            return Redis::invoker('redis',function ($redis) use ($email){
                return $redis->setEx($this->table.":".$email,3600,1);
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('email_queue_set:line'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

    public function exists($email)
    {
        try
        {
            return Redis::invoker('redis',function ($redis) use ($email){
                return $redis->exists($this->table.":".$email);
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('email_queue_exists:line'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

    public function del($email)
    {
        try
        {
            return Redis::invoker('redis',function ($redis) use ($email){
                $redis->del($this->table.":".$email);
                return true;
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('email_queue_del:line'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }
}
