<?php
    require_once 'connect.php';
    $name = $_POST['name'];
    $email = $_POST['email'];
    $login = $_POST['login'];
    $password = $_POST['password'];

    $check_user = mysqli_query($connect, "SELECT * FROM `users` WHERE `login` = '$login'");
    if (mysqli_num_rows($check_user) > 0){
        echo 0;
    }else {
        mysqli_query($connect, "INSERT INTO `users` (`id`, `name`, `login`, `email`, `password`) VALUES (NULL, '$name', '$login', '$email', '$password')");
        echo 1;
    }
?>