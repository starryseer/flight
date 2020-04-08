<?php
/**
 * Created by PhpStorm.
 * User: Tioncico
 * Date: 2019/4/11 0011
 * Time: 14:40
 */

namespace App\HttpController\Client;
use EasySwoole\Http\AbstractInterface\Controller;
use EasySwoole\EasySwoole\Logger;

class Base extends Controller{
    public function index()
    {
        return $this->writeJson(500,'error router');
    }

    public function json_return($code = 200,$data=NULL,$message='success')
    {
        $return_data = [
            "mess"=>$message,
            "code"=>$code,
            "data"=>$data,
        ];
        $this->response()->withHeader('Access-Control-Allow-Origin','*')->write(json_encode($return_data,true));
    }

    public function raw_return($data)
    {
        $this->response()->withHeader('Access-Control-Allow-Origin','*')->write($data);
    }


}