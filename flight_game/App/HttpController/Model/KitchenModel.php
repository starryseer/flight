<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/27
 * Time: 15:33
 */

namespace App\HttpController\Model;

use EasySwoole\ORM\AbstractModel;

class KitchenModel extends AbstractModel
{
    /**
 * @var string
 */
    protected $tableName = 'kitchen';

    // 都是非必选的，默认值看文档下面说明
    protected $autoTimeStamp = 'datetime';
    protected $updateTime = 'last_time';
    protected $createTime = 'create_time';

}