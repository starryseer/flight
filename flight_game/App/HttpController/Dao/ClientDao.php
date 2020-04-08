<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/20
 * Time: 15:32
 */
namespace App\HttpController\Dao;

use App\HttpController\Model\ClientModel;
use EasySwoole\ORM\DbManager;

class ClientDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function get($id)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($id){

                $clientModel = ClientModel::invoke($client);
                $clientModel = $clientModel->where('user_id',$id);
                $user = $clientModel->get();
                if(empty($user))
                    return [];
                else
                    return $user->toArray();
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    public function add($id,$account,$channel,$ip)
    {
        try
        {
            return DbManager::getInstance()->invoke(function ($client)use($id,$account,$channel,$ip){
                $clientInfo = [
                    'user_id'=>$id,
                    'login_account'=>$account,
                    'create_channel'=>$channel,
                    'last_ip'=>$ip,
                ];
                $clientModel = ClientModel::invoke($client,$clientInfo);
                $id = $clientModel->save();
                if(empty($id))
                    return [];
                else
                    return $clientInfo;
            });
        }
        catch(\Exception $e)
        {
            return false;
        }
    }
}