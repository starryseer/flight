<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/9/3
 * Time: 19:05
 */

namespace App\HttpController\Dao;

use EasySwoole\EasySwoole\Logger;
use EasySwoole\MysqliPool\Mysql;

class DydOrderDao
{
    public $table='dyd_order';

    public function add($order)
    {
        try
        {
            return Mysql::invoker('mysql',function ($db) use ($order){
                return $db->insert($this->table, $order);

            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('dyd_order_add line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

    public function get($orderID)
    {
        try
        {
            return Mysql::invoker('mysql',function ($db) use ($orderID){
                $db->where('orderID',$orderID);
                return $db->get($this->table);
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('dyd_order_get line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }
}