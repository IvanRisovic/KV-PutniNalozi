<?php

header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

require_once "connection.php";
require_once "classes.php";

$sQuery = "SELECT * FROM zaposlenik";

$oStat = $conn->query($sQuery);
$oZap = array();
while($oRow = $oStat->fetch(PDO::FETCH_BOTH))
{
    array_push($oZap, new ZaposlenikSelect($oRow['id'], $oRow['ime'], $oRow['prezime']));
}

echo json_encode($oZap);