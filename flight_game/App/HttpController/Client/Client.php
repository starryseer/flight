<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/2/20
 * Time: 13:48
 */

namespace App\HttpController\Client;

use App\HttpController\Common\Web;
use App\HttpController\Service\ClientService;
use App\HttpController\Service\ClientAttrService;
use App\HttpController\Service\ClientOlService;
use App\HttpController\Service\ItemService;
use EasySwoole\EasySwoole\Config;

class Client extends Base
{
    public function login()
    {
        $data = $this->request()->getRequestParam();
        try {
            $userId = isset($data['userId'])?trim($data['userId']):'';
            $token    = isset($data['token'])?trim($data['token']):'';
            $ip = isset($this->request()->getHeader('x-real-ip')[0])?$this->request()->getHeader('x-real-ip')[0]:"";


            if(empty($userId) or empty($token))
                return $this->json_return(49999,'','缺少参数');

            $info = Web::post(__CONF__['basic']['login_url']['value'],['userId'=>$userId,'token'=>$token]);
            if($info['code'] != 200)
                return $this->json_return(50001,'','登陆验证失败');

            $clientService = ClientService::getInstance();
            if(empty($client = $clientService->getClient($userId)))
            {
                $client = $clientService->initClient($userId,$info['data']['user']['login_account'],$info['data']['user']['create_channel'],$ip);
            }

            $item = ItemService::getInstance()->getAll($userId);

            $clientAttr = ClientAttrService::getInstance()->get($userId);

            ClientOlService::getInstance()->addOl($userId,$token,$ip);

            return $this->json_return(200,['client'=>$client,'clientAttr'=>$clientAttr,'item'=>$item]);
        }
        catch(\Exception $e)
        {
            return $this->json_return(50002,'','param error');
        }
    }

}