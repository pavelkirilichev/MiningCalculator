<?php 
    require 'complects/config/connect_db.php';

    $info = json_decode(file_get_contents('https://api.minerstat.com/v2/hardware'));

    mysqli_query($link, "DROP TABLE hardware");
    mysqli_query($link, "DROP TABLE hardware_alg");
    
    mysqli_query($link, "CREATE TABLE hardware (id INT(10) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(200) , type VARCHAR(15))");
    mysqli_query($link, "CREATE TABLE hardware_alg (id INT(10) PRIMARY KEY AUTO_INCREMENT, hardware_id INT(10), speed INT(100) , power VARCHAR(100))");

    $hard_sql = mysqli_query($link, "SELECT * FROM `hardware` ORDER BY `id` DESC LIMIT 1");
    $hard_res = mysqli_fetch_array($hard_sql);
    $hard_id = $hard_res->id + 1;
    echo $hard_id;

    foreach ($info as $res) {
        $hard_name = $res->name;
        $hard_type = $res->type;

        mysqli_query($link, "INSERT INTO `hardware` (`name`, `type`) VALUES ('$hard_name', '$hard_type')");
        $alg_arr = $res->algorithms;
        
        foreach ($alg_arr as $key => $res_alg) {
            $alg_name = $key;
            $speed = $res_alg->speed;
            $power = $res_alg->power;

            mysqli_query($link, "INSERT INTO `hardware_alg` (`hardware_id`, `name`, `speed`, `power`) VALUES ('$hard_id', '$alg_name', '$speed', '$power')");
        }
        $hard_id++;
    }
?>