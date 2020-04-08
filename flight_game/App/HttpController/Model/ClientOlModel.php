<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/20
 * Time: 16:02
 */

namespace App\HttpController\Model;

use EasySwoole\ORM\AbstractModel;

class ClientOlModel extends AbstractModel
{
    /**
     * @var string
     */
    protected $tableName = 'client_ol';

    // 都是非必选的，默认值看文档下面说明
    protected $autoTimeStamp = 'datetime';
    protected $updateTime = 'last_time';
}