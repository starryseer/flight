<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/4/27
 * Time: 15:35
 */

namespace App\HttpController\Dao;

use EasySwoole\ORM\DbManager;
use App\HttpController\Model\KitchenModel;

class KitchenDao
{
    use \EasySwoole\Component\CoroutineSingleTon;

    public function init($userId)
    {
        return DbManager::getInstance()->invoke(function ($client)use($userId){
            $kitchenConf = __CONF__['kitchen'];
            $initData = [
                'client_id'=>$userId,
                'menu_id'=>0,
                'start_time'=>date('Y-m-d H:i:s'),
                'acc_time'=>0,
                'status'=>0,
                'status'=>0,
            ];
            $ids = [];
            foreach($kitchenConf as $conf)
            {
                if($conf['type'] == 'init')
                {
                    $initData['kitchen_id'] = $conf['id'];
                    $kitchenModel = KitchenModel::invoke($client,$initData);
                    $ids[] = $kitchenModel->save();
                }
            }
            return $ids;
        });
    }

    public function get($id,$userId)
    {
        return DbManager::getInstance()->invoke(function ($client)use($id,$userId){
            $kitchenModel = KitchenModel::invoke($client);
            if(!empty($id))
            {
                if(is_array($id))
                    $kitchenModel->where('id',$id,'in');
                else
                    $kitchenModel->where('id',$id);
            }
            if(!empty($userId))
                $kitchenModel->where('client_id',$userId);

            return $kitchenModel->all();
        });
    }
}