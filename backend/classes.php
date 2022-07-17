<?php

class Osoba
{    
    public $ime;
    public $prezime;    
}


class Zaposlenik extends Osoba
{
    public $id;    

    public function __construct($br = null, $i = null, $p = null)
    {
        if($br) $this->id = $br;
        if($i) $this->ime = $i;
        if($p) $this->prezime = $p;
        
    }
}

class PutniNalog
{
    public $brojnal;
    public $polaziste;
    public $odrediste;
    public $svrha;
    public $datum;
    public $bDana;
    public $odobreno;
    public $zaposlenik = array();
    public $prijevoz;

    public function __construct($bn = null, $po = null, $o = null, $s = null, $d = null, $bd = null, $od = null, $pr = null, $z = array())
    {
        if($bn) $this->brojnal = $bn;
        if($po) $this->polaziste = $po;
        if($o) $this->odrediste = $o;
        if($s) $this->svrha = $s;
        if($d) $this->datum = $d;
        if($bd) $this->bDana = $bd;        
        if($od) $this->odobreno = $od;
        if($z) $this->zaposlenik = $z; 
        if($pr) $this->prijevoz = $pr;       
    }
}

class Login 
{
    public $uname;
    public $pass;

    public function __construct($u = null, $p = null)
    {
        if($u) $this->uname = $u;
        if($p) $this->pass = $p;
    }
}

class ZaposlenikSelect 
{
    public $id; 
    public $osoba;

    public function __construct($br = null, $i = null, $p = null)
    {
        if($br) $this->id = $br;        
        $this->osoba = $i." ".$p;
        
    }
}