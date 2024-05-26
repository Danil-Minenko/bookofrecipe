<?php
    require_once 'connect.php';

    $result = mysqli_query($connect, "SELECT * FROM `recipes`");
    if (mysqli_num_rows($result) > 0){
        $recipes = mysqli_fetch_all($result);
        echo json_encode($recipes);
    }else {
        echo 0;
    }
?>