<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/27
 * Time: 19:50
 */

namespace App\HttpController\Model;

use EasySwoole\ORM\AbstractModel;

class MonthCardModel extends AbstractModel
{
    /**
     * @var string
     */
    protected $tableName = 'month_card';

    // 都是非必选的，默认值看文档下面说明
    protected $autoTimeStamp = 'datetime';
    protected $updateTime = 'last_time';
    protected $createTime = 'create_time';
}