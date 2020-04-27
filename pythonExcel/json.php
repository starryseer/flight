<?php
define('DS', DIRECTORY_SEPARATOR);
function getDirFiles($dir)
{
    $arr = array();
    $hander = scandir($dir);
    foreach ($hander as $v) {
        if (is_dir($dir . DS . $v) && $v != "." && $v != "..") {
            $arr[$v] = getDirFiles($dir . DS . $v);
        } else {
            if ($v != "." && $v != "..") {
                $arr[] = $v;
            }
        }
    }
    return $arr;
}

$file_list = getDirFiles("json");
foreach ($file_list as $file)
{
    $file_name = explode(".",$file)[0];
    $file_php = "php/{$file_name}.php";
    $card = file_get_contents("json/$file");
    $card = json_decode($card, true);
    $new_card = array_map(function($c){
        if(isset($c['name']));
            unset($c['name']);
        if(isset($c['info']));
            unset($c['info']);
        return $c;
    },$card);
    $s = "<?php return " . var_export($new_card, true) . ";";
    file_put_contents($file_php, $s);
    var_dump($file_php);
}
sleep(1);

