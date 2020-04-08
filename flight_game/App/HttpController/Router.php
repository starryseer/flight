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
        $routeCollector->post('/login', '/client/client/login');
        $routeCollector->post('/natureUp', '/client/fatigue/natureUp');
        $routeCollector->post('/itemAll', '/client/item/getAll');
        $routeCollector->post('/consume', '/client/item/consume');
        $routeCollector->post('/sale', '/client/item/sale');
        $routeCollector->post('/upBag', '/client/bag/upBag');
        $routeCollector->post('/draw', '/client/draw/draw');
        $routeCollector->post('/cook', '/client/cook/cook');
    }
}