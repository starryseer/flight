<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/9/3
 * Time: 17:47
 */

namespace App\HttpController\Dao;

use EasySwoole\EasySwoole\Logger;
use EasySwoole\MysqliPool\Mysql;

class ServerDao
{
    public $table='server';

    public function getServer()
    {
        try
        {
            return Mysql::invoker('mysql',function ($db){
                $servInfo = $db->get($this->table);
                if(!is_array($servInfo) or count($servInfo) == 0)
                    return false;
                else
                    return $servInfo;
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('addUser line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }
}