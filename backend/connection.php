<?php

$host = "127.0.0.1";
$user = "root";
$db = "putnal";
$pass = "";

try
{
    $conn = new PDO("mysql:host=$host;dbname=$db", $username = $user, $password = $pass);
    //echo "Connected";
}
catch(PDOException $p)
{
    die("Connection failed: ".$p->getMessage());
}