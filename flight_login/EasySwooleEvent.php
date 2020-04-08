<?php
namespace EasySwoole\EasySwoole;


use EasySwoole\EasySwoole\Swoole\EventRegister;
use EasySwoole\EasySwoole\AbstractInterface\Event;
use EasySwoole\Http\Request;
use EasySwoole\Http\Response;

use EasySwoole\ORM\DbManager;
use EasySwoole\ORM\Db\Connection;
use EasySwoole\ORM\Db\Config as DbConfig;

use EasySwoole\Socket\Dispatcher;
use App\WebSocket\WebSocketParser;

class EasySwooleEvent implements Event
{

    public static function initialize()
    {
        // TODO: Implement initialize() method.
        date_default_timezone_set('Asia/Shanghai');
        self::loadConf();
    }
    public static function loadConf()
    {
        //遍历目录中的文件
        $files = \EasySwoole\Utility\File::scanDirectory(EASYSWOOLE_ROOT . '/App/Conf');
        if (is_array($files)) {
            //$files['files'] 一级目录下所有的文件,不包括文件夹
            foreach ($files['files'] as $file) {
                $fileNameArr = explode('.', $file);
                $fileSuffix = end($fileNameArr);

                if ($fileSuffix == 'php') {
                    \EasySwoole\EasySwoole\Config::getInstance()->loadFile($file);//引入之后,文件名自动转为小写,成为配置的key
                }
            }
        }
    }

    public static function mainServerCreate(EventRegister $register)
    {
        $config = new DbConfig();
        $config->setDatabase(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.database'));
        $config->setUser(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.user'));
        $config->setPassword(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.password'));
        $config->setHost(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.host'));
        //连接池配置
        $config->setGetObjectTimeout(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.objectTimeout')); //设置获取连接池对象超时时间
        $config->setIntervalCheckTime(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.intervalCheckTime')); //设置检测连接存活执行回收和创建的周期
        $config->setMaxIdleTime(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.maxIdleTime')); //连接池对象最大闲置时间(秒)
        $config->setMaxObjectNum(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.maxObjectNum')); //设置最大连接池存在连接对象数量
        $config->setMinObjectNum(\EasySwoole\EasySwoole\Config::getInstance()->getConf('MYSQL.minObjectNum')); //设置最小连接池存在连接对象数量

        DbManager::getInstance()->addConnection(new Connection($config));

        $poolConfig = new \EasySwoole\Pool\Config();
        $redisConfig = new \EasySwoole\Redis\Config\RedisConfig(\EasySwoole\EasySwoole\Config::getInstance()->getConf('REDIS'));
        \EasySwoole\RedisPool\Redis::getInstance()->register('redis',new \EasySwoole\Redis\Config\RedisConfig());

    }

    public static function onRequest(Request $request, Response $response): bool
    {
        // TODO: Implement onRequest() method.
        return true;
    }

    public static function afterRequest(Request $request, Response $response): void
    {
        // TODO: Implement afterAction() method.
    }
}