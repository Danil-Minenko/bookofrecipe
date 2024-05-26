<?php
    require_once 'connect.php';

    $recipeId = $_POST['recipe_id'];

    $result = mysqli_query($connect, "SELECT * FROM `recipes` WHERE `id` = '$recipeId'");
    if (mysqli_num_rows($result) > 0){
        $recipe = mysqli_fetch_assoc($result);
        echo json_encode($recipe);
    }else {
        echo 0;
    }
?>