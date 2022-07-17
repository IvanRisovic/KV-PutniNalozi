<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once "connection.php";
require_once "classes.php";

$sQuery = "INSERT INTO nalog (polaziste, odrediste, svrha, datum, brojdana, odobreno, prijevoz) VALUES(:polaziste, :odrediste, :svrha, :datum, :brojdana, :odobreno, :prijevoz)"; 

if($oStat = $conn->prepare($sQuery))
{
    //$oStat->bindValue(':brojnal', $_POST['brojnal']);
    $oStat->bindValue(':polaziste', $_POST['polaziste']);
    $oStat->bindValue(':odrediste', $_POST['odrediste']);
    $oStat->bindValue(':svrha', $_POST['svrha']);
    $oStat->bindValue(':datum', $_POST['datum']);
    $oStat->bindValue(':brojdana', $_POST['bDana']);
    $oStat->bindValue(':odobreno', $_POST['odobreno']); 
    $oStat->bindValue(':prijevoz', $_POST['prijevoz']);       
    $oStat->execute();
}
else
{
    echo "Error: " .$oStat. "<br>".$conn->error;
    echo "<br>Statement error: ".$oStat->error;
}


$oQuery = "INSERT INTO nalzap VALUES({$_POST['zaposlenici']}, (SELECT brojnal from nalog order by brojnal desc limit 1))";
$oStat = $conn->query($oQuery);



echo $_POST['zaposlenici'];
