<?php
header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

require_once "./connection.php";
require_once "./classes.php";

$sql = "SELECT * FROM nalog";
$Statment = $conn->query($sql);
$sArr = array();

while ($oRow = $Statment->fetch(PDO::FETCH_BOTH)) 
{
    array_push($sArr, new PutniNalog($oRow['brojnal'], $oRow['polaziste'], $oRow['odrediste'], $oRow['svrha'], $oRow['datum'], $oRow['brojdana'], $oRow['odobreno'], $oRow['prijevoz']));
}
// echo'<pre>';
// var_dump($sArr);
// echo '</pre>';

$query = "SELECT * FROM zaposlenik";
$oStat = $conn->query($query);
$sArr1 = array();

while ($oRow = $oStat->fetch(PDO::FETCH_BOTH))
{
    array_push($sArr1, new Zaposlenik($oRow['id'], $oRow['ime'], $oRow['prezime']));
}

// echo '<pre>';
// var_dump($sArr1);
// echo '</pre>';

$sQuery = "SELECT * FROM nalzap";
$oStat = $conn->query($sQuery);
$sNalog = array();
$sZaposlenik = array();
while ($oRow = $oStat->fetch(PDO::FETCH_BOTH)) 
{   
    foreach($sArr as $p)
    {
        if($oRow['brojnal'] == $p->brojnal)
        {
            foreach($sArr1 as $z)
            {
                if($z->id == $oRow['id'])
                {
                    array_push($p->zaposlenik, $z);
                    break;
                }
            }
            break;
        }
        
    }
}

// echo '<pre>';
// print_r($sArr);
// echo '</pre>';  

echo json_encode($sArr);
