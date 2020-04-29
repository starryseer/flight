<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/17
 * Time: 14:47
 */

namespace App\HttpController\Common;


class MoodHelper
{
    public static function cookExtra($mood)
    {
        $moodConf = static::getMoodConf($mood);
        $rand = rand(1,100);
        if($rand >= $moodConf['cookExtra'])
            return 2;
        else
            return 1;
    }

    public static function getMoodConf($mood)
    {
        $moodConf = __CONF__['mood'];
        foreach($moodConf as $moodC)
        {
            if($mood >= $moodC['min'] and $mood <=$moodC['max'])
                return $moodC;
        }
        return false;
    }

    public static function cookMood($mood)
    {
        $moodConf = static::getMoodConf($mood);
        $mood+=$moodConf['cookMood'];
        $mood = min(max($mood,-200),200);
        return $mood;
    }
}