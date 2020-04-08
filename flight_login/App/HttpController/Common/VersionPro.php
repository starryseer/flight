<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2019/9/3
 * Time: 17:25
 */

namespace App\HttpController\Common;


class VersionPro
{
    public static $service = [
            array(
                'id'=>'2016',
                'dsp_id'=>'1',
                'url'=>'http://ke3ty-g1.foremansoft.com:8012/ga.php',
                'name'=>'合服',
                'chat_name'=>'ke3_test_a',
                'is_new'=>'1',
                'is_default'=>'1',
                'lev'=>'1',
                'levstr'=>'轻',
            ),
            array(
                'id'=>'2018',
                'dsp_id'=>'1',
                'url'=>'http://ke3ty-g1.foremansoft.com:8010/ga.php',
                'name'=>'星堡',
                'chat_name'=>'ke3_test_a',
                'is_new'=>'1',
                'is_default'=>'1',
                'lev'=>'1',
                'levstr'=>'轻',
            )
    ];
}