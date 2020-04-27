<?php
/**
 * Created by PhpStorm.
 * User: yf
 * Date: 2018/8/15
 * Time: 上午10:39
 */

namespace App\HttpController;

use EasySwoole\Http\AbstractInterface\AbstractRouter;
use FastRoute\RouteCollector;
use EasySwoole\Http\Request;
use EasySwoole\Http\Response;

class Router extends AbstractRouter
{
    function initialize(RouteCollector $routeCollector)
    {
        $routeCollector->post('/client_login', '/client/client/login');
        $routeCollector->post('/clientAttr', '/client/clientAttr/clientAttr');
        $routeCollector->post('/clientAttr_nickname', '/client/clientAttr/setNickname');
        $routeCollector->post('/clientAttr_signature', '/client/clientAttr/setSignature');
        $routeCollector->post('/fatigue_natureUp', '/client/fatigue/natureUp');
        $routeCollector->post('/item_all', '/client/item/getAll');
        $routeCollector->post('/item_consume', '/client/item/consume');
        $routeCollector->post('/item_sale', '/client/item/sale');
        $routeCollector->post('/bag_up', '/client/bag/upBag');
        $routeCollector->post('/shop_draw', '/client/draw/draw');
        $routeCollector->post('/mini_index', '/client/miniGame/index');
        $routeCollector->post('/mini_play', '/client/miniGame/play');
        $routeCollector->post('/mini_rank', '/client/miniGame/rank');
        $routeCollector->post('/cook_index', '/client/cook/index');
        $routeCollector->post('/cook_unlock', '/client/cook/unlock');
        $routeCollector->post('/cook_start', '/client/cook/start');
        $routeCollector->post('/cook_end', '/client/cook/end');

    }
}