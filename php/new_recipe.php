<?php
    require_once 'connect.php';

    $date = $_POST['date'];
    $path ='../uploads/';
    $images = $_FILES['images'];

    $title = $_POST['title'];
    $description = $_POST['description'];
    $preview = $_POST['preview'];
    $ingredients = $_POST['ingredients'];
    $steps = $_POST['steps'];
    $userId = $_POST['session'];

    mysqli_query($connect, "INSERT INTO `recipes` (`id`, `title`, `description`, `preview`, `ingredients`, `steps`, `author`) VALUES (NULL, '$title', '$description', '$preview', '$ingredients', '$steps', '$userId')");

    foreach($images['tmp_name'] as $image => $tmpName){
        $fileName = $images['name'][$image];
        move_uploaded_file($tmpName, $path.$date.$fileName);
        $result = $path.$date.$fileName;
    }

    echo json_encode($result);
?>
