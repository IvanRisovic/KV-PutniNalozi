<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once "connection.php";

$sQuery = "UPDATE putnal.nalog SET odobreno = NOT odobreno WHERE brojnal=".$_POST['brojnal'];
$sStat = $conn->query($sQuery);
