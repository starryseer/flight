<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/20
 * Time: 15:58
 */

namespace App\HttpController\Dao;

use App\HttpController\Model\ClientOlModel;
use EasySwoole\ORM\DbManager;


class ClientOlDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function addOl($userId,$token,$ip)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId,$token,$ip){

                ClientOlModel::invoke($client)->destroy(['client_id' => $userId]);
                $clientModel = ClientOlModel::invoke($client,[
                    'client_id' => $userId,
                    'token' => $token,
                    'ip' => $ip,
                ]);
                $clientModel->save();
                return true;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function accessToken($userId,$token)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($userId,$token){
                $clientOlModel = ClientOlModel::invoke($client);
                $clientOlModel->where('client_id',$userId);
                $clientOlModel->where('token',$token);
                $clientOl = $clientOlModel->get();
                if(empty($clientOl))
                    return false;

                return true;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }
}