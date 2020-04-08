<?php
/**
 * Created by PhpStorm.
 * User: EDZ
 * Date: 2020/3/13
 * Time: 9:58
 */

namespace App\HttpController\Common;


class DrawHelper
{
    public static function rand($pool,$num)
    {
        $randList = [];
        $rand = [];
        $itemList = [];
        $randMax = 0;

        foreach(__CONF__[$pool] as $award)
        {
            $randMax+=$award['weigh'];
            $randList[$randMax] = $award['value'];
        }
        $index = 0;
        for($i=1;$i<=$num;$i++)
        {
            $rand[] = rand(1,$randMax);
        }
        sort($rand);
        $rand = array_values($rand);
        foreach($randList as $key => $itemId)
        {
            while($index < count($rand))
            {
                if($rand[$index] <= $key)
                {
                    $index++;
                    $itemList[] = $itemId;
                }
                else
                    break;

            }

        }
        return $itemList;
    }
}