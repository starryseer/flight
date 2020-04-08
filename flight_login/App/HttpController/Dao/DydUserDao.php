<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/8/28
 * Time: 16:34
 */

namespace App\HttpController\Dao;

use App\HttpController\Common\Token;
use EasySwoole\EasySwoole\Logger;
use EasySwoole\MysqliPool\Mysql;


class DydUserDao
{
    public $table='dyd_user';

    public function getDydUser($sdkID)
    {
        try
        {
            return Mysql::invoker('mysql',function ($db) use ($sdkID){
                $dyd_user = $db->where('sdk_id',$sdkID)->get($this->table);
                if(!$dyd_user or !is_array($dyd_user) or count($dyd_user) == 0)
                    return false;
                else
                    return $dyd_user[0];
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('addUser line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }

    public function addDydUser($user)
    {
        try
        {
            return Mysql::invoker('mysql',function ($db) use ($user){
                return $db->insert($this->table,$user);
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('addUser line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }
}