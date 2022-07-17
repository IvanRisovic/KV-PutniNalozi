<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once "connection.php";
require_once "classes.php";

$sQuery = "DELETE FROM putnal.nalog WHERE brojnal=".$_POST['brojnal'];
$oQuery = "DELETE FROM putnal.nalzap WHERE brojnal=".$_POST['brojnal'];
$sStat = $conn->query($sQuery);
$oStat = $conn->query(($oQuery));