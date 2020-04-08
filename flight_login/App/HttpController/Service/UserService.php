<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/8/28
 * Time: 16:04
 */

namespace App\HttpController\Service;

use App\HttpController\Dao\UserDao;

class UserService
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function checkToken($userId,$token)
    {
        return UserDao::getInstance()->userByToken($userId,$token);
    }
}