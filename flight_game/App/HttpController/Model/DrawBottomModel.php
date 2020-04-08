<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/14
 * Time: 11:13
 */

namespace App\HttpController\Model;

use EasySwoole\ORM\AbstractModel;

class DrawBottomModel extends AbstractModel
{
    /**
     * @var string
     */
    protected $tableName = 'draw_bottom';

    // 都是非必选的，默认值看文档下面说明
    protected $autoTimeStamp = 'datetime';
    protected $updateTime = 'last_time';
}