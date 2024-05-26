<?php
    $connect = mysqli_connect('localhost', 'root', '', 'bookpage');
    if(!$connect){
        die("Ошибка подключения к базе данных");
    }
?>