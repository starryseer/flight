<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/9/3
 * Time: 17:17
 */

namespace App\HttpController\Dao;

use EasySwoole\EasySwoole\Logger;
use EasySwoole\MysqliPool\Mysql;

class VersionDao
{
    public $table='channel_version';

    public function getVersion($channel_id)
    {
        try
        {
            return Mysql::invoker('mysql',function ($db) use ($channel_id){
                $db->where('channel_id',$channel_id);
                $verInfo = $db->get($this->table);
                if(!is_array($verInfo) or count($verInfo) == 0)
                    return false;
                else
                    return $verInfo[0];
            });
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('addUser line:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }
    }
}