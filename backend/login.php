<?php

header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

require_once "connection.php";
require_once "classes.php";

$sQuery = "SELECT id, razina FROM putnal.login WHERE uname='".$_POST['uname']."'AND pass='".$_POST['pass']."'";

$oStat = $conn->query($sQuery);
$sUser = array();
array_push($sUser, false);
while($oRow = $oStat->fetch(PDO::FETCH_BOTH))
{
    array_push($sUser, $oRow['id']);
    array_push($sUser, $oRow['razina']);
    $sUser[0] = true;
}

echo json_encode($sUser);