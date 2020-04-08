<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/19
 * Time: 11:39
 */

namespace App\HttpController\Model;

use EasySwoole\ORM\AbstractModel;

class UserModel extends AbstractModel
{
    /**
     * @var string
     */
    protected $tableName = 'user';

    // 都是非必选的，默认值看文档下面说明
    protected $autoTimeStamp = 'datetime';
    protected $createTime = 'create_time';
    protected $updateTime = 'last_time';
}