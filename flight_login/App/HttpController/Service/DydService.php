<?php
/**
 * Created by PhpStorm.
 * User: Tioncico
 * Date: 2019/4/11 0011
 * Time: 14:40
 */

namespace App\HttpController\Service;
use App\HttpController\Common\DydHelper;
use App\HttpController\Dao\DydUserDao;

class DydService{
    public function checkDyd($userID,$token)
    {
        try{
            $postArr = ["userID"=>$userID,"token"=>$token];
            $postArr['sign'] = DydHelper::md5($postArr,DydHelper::$DYDSECRET_APPKEY);

            $url = DydHelper::$DYDSECRET_URL;
            $path = '/login_verify';
            $http_client = new \EasySwoole\HttpClient\HttpClient("https://{$url}{$path}");
            $response = $http_client->post($postArr);
            $response = $response->getBody();

            $data = json_decode($response,true);
            if(!is_array($data) or !isset($data['code']) or $data['code'] !=200)
                return false;

            return $data;
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('checkDyd:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return false;
        }

    }

    public function getDydUser($sdkID)
    {
        $dydDao = new DydUserDao();
        return $dydDao->getDydUser($sdkID);

    }

    public function addDydUser($channelID,$sdkID,$userID)
    {
        $user = [
            'channel'=>$channelID,
            'sdk_id'=>$sdkID,
            'user_id'=>$userID,
        ];
        $dydDao = new DydUserDao();
        return $dydDao->addDydUser($user);
    }

    public function addCharge($data)
    {
        $orderID = $data['orderID'];
        $dydOrderDao = new DydOrderDao();
        $order = $dydOrderDao->get($orderID);
        if(is_array($order) and count($order) >0)
            return false;


        $arr = array(
            'orderID'=>$orderID,
            'amount'=>intval($data['money'])/100,
            'timestamp'=>$data['timestamp'],
            'userID'=>$data['userID'],
            'sdk'=>$data['sdk'],
            'appID'=>$data['appID'],
            'ChannelOrderID'=>$data['ChannelOrderID'],
            'game_user_id'=>$data['roleID'],
            'roleName'=>$data['roleName'],
            'product_id'=>$data['productID'],
            'serverID'=>$data['serverID'],
            'serverName'=>$data['serverName'],
            'currency'=>$data['currency'],
            'TradeSeq'=>intval($data['TradeSeq']),
            'create_time'=>date('Y-m-d H:i:s'),
        );
        return $dydOrderDao->add($arr);
    }
}