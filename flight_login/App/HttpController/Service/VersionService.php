<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/9/3
 * Time: 17:13
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\VersionDao;
use App\HttpController\Common\VersionPro;

class VersionService
{
    public function checkVersion($channel_id,$version)
    {
        $versionDao = new VersionDao();
        $verInfo = $versionDao->getVersion($channel_id);
        if(!$verInfo)
            return false;

        $ret = [];
        if($version > $verInfo['max_version'])
        {
            $ret['status'] = 1;
            $ret['servers'] = VersionPro::$service;
            $ret['ispro'] = 1;
        }
        else if($version >=$verInfo['min_version'])
        {
            $serverDao = new ServerDao();
            $servList = $serverDao->getServer();
            if(!is_array($servList))
                return false;

            $ret['status'] = 1;
            $ret['servers'] = $servList;
            $ret['ispro'] = 0;
        }
        else
            return false;


    }
}