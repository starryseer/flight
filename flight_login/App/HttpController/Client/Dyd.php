<?php
/**
 * Created by PhpStorm.
 * User: Tioncico
 * Date: 2019/4/11 0011
 * Time: 14:40
 */

namespace App\HttpController\Client;
use App\HttpController\Service\DydService;
use App\HttpController\Service\UserService;
use App\HttpController\Service\VersionService;
use App\HttpController\Common\DydHelper;
use App\HttpController\Common\Token;
use EasySwoole\EasySwoole\Logger;

class Dyd extends Base{

    public function dydVerify()
    {
        $data = $this->request()->getRequestParam('postStr');
        Logger::getInstance()->log('dydVerify:'.json_encode($data,true),'info');
        try {
            $data = json_decode($data,true);
            $userID = isset($data['userID'])?trim($data['userID']):'';
            $token = isset($data['token'])?trim($data['token']):'';

            if(empty($userID) or empty($token))
                return $this->json_return(50001, '', 'lack param');

            $dydService = new DydService();
            if(!$dydService->checkDyd($userID,$token))
                return $this->json_return(50002,'','verify fail');

            $json = [];
            $json['userID'] = $userID;
            $json['channelID'] = DydHelper::$DYD_CHANNEL;
            $json['loginToken'] = Token::enLoginToken($json['channelID'],$json['userID']);

            return $this->json_return(200,$json);

        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('dydVerify:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return $this->json_return(50008,'','param error');
        }
    }

    public function dydLogin()
    {
        $data = $this->request()->getRequestParam('postStr');
        Logger::getInstance()->log('dydLogin:'.json_encode($data,true),'info');
        try {
            $data = json_decode($data,true);

            $loginToken = isset($data['loginToken'])?trim($data['loginToken']):'';
            $version    = isset($data['version'])?trim($data['version']):'';
            $deviceType    = isset($data['deviceType'])?trim($data['deviceType']):'';

            if(($tokenArr = Token::deLoginToken($loginToken)) === false)
                return $this->json_return(50003,'','error token');

            $channelID = $tokenArr[0];
            $sdkID = $tokenArr[1];
            $ip = $this->request()->getHeader('x-real-ip')[0];

            $versionService = new VersionService();
            $servList = $versionService->checkVersion($channelID,$version);
            if(!is_array($servList))
                return $this->json_return(50004,'','error server list');

            $dydService = new DydService();
            $dydInfo = $dydService->getDydUser($sdkID);
            $userService  = new UserService();
            if($dydInfo === false)
            {
                if(($user = $userService->generateUser($channelID,$sdkID,$version,$deviceType,$ip)) === false)
                    return $this->json_return(50004,'','generate user error');

                if(!$dydService->addDydUser($channelID,$sdkID,$user['id']))
                    return $this->json_return(50005,'','generate user error');
            }
            else
            {
                $user = $userService->getUser($dydInfo[0]['user_id']);
                if(!$user)
                    return $this->json_return(50006,'','get user error');
            }


            $user['token'] = $userService->uploadToken($user['id'],$version,$deviceType,$ip);
            if(!$user['token'])
                return $this->json_return(50007,'','update token error');

            $user['servers'] = $servList['servers'];#登录服务器信息
            $user['ispro'] = $servList['ispro'];#1=正式 0=送审

            return $this->json_return(200,['user'=>$user]);
        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('dydVerify:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return $this->json_return(50008,'','param error');
        }
    }

    public function payBack()
    {
        $data = $this->request()->getRequestParam();
        Logger::getInstance()->log('dydPayBack:'.json_encode($data,true),'info');
        try {

            if(!isset($data['content']) or !isset($data['sign']) or !isset($data['signType']))
                return $this->raw_return('fail');

            $content = $data['content'];
            $sign = $data['sign'];

            if(DydHelper::paySha256($content,$sign)){
                $info = json_decode($content,true);
                $dydService = new DydService();
                if($dydService->addCharge($info))
                    return $this->raw_return('success');
            }

            return $this->raw_return('fail');

        }
        catch(\Exception $e)
        {
            Logger::getInstance()->log('payBack:'.$e->getLine().'>>>'.$e->getMessage(),'error');
            return $this->raw_return('fail');
        }
    }
}