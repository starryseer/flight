<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/2
 * Time: 15:55
 */

namespace App\HttpController\Model;

use EasySwoole\ORM\AbstractModel;

class BagModel extends AbstractModel
{
    /**
     * @var string
     */
    protected $tableName = 'bag';

    // 都是非必选的，默认值看文档下面说明
    protected $autoTimeStamp = 'datetime';
    protected $updateTime = 'last_time';
    protected $createTime = 'create_time';
}