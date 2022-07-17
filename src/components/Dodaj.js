import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import {subDays} from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import hr from 'date-fns/locale/hr';
import { format } from 'date-fns';
import {Select} from 'react-dropdown-select';

const zaposlenikURL = 'http://localhost:8080/KV-PutniNalozi/backend/readZaposlenik.php';

const Dodaj = () => {
    const dodajNalog = (bn, po, o, s, d, bd, od, z, pr) => {
        if(dodaj.prijevoz == null)
        {
            alert('Odaberite vrstu prijevoza');
            return;
        }
        var params = new URLSearchParams();
        //params.append('brojnal', bn);
        params.append('polaziste', po);
        params.append('odrediste', o);
        params.append('svrha', s);
        params.append('datum', format(startDate,'yyyy-MM-dd'))
        params.append('bDana', bd);
        params.append('odobreno', (pr == 'sluzbeni') ? 1 : 0);
        params.append('zaposlenici', z); 
        params.append('prijevoz', pr);       
        axios.post("http://localhost:8080/KV-PutniNalozi/backend/add.php", params).then((response) => { console.log(response.data); });
    }

    registerLocale('hr', hr);    
    setDefaultLocale('hr');    
    
    const [startDate, setStartDate] = useState(new Date());   

    const [dodaj, setDodaj] = useState({});

    const [odobreno, setOdobreno] = useState(false);

    const [zap, setZap] = useState([]);

    const [select, setSelect] = useState([]);

    function getZaposlenik() {
        axios.get(zaposlenikURL).then((response) => {
            setZap(response.data);                         
        })
    }

    useEffect(() => {
        getZaposlenik();
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();                
        if(dodaj.brojnal <= 0)
        {
            alert("Broj naloga ne može biti nula ili  negativan.");
            return;
        }
        if(dodaj.bDana <= 0)
        {
            alert("Broj dana ne može biti nula ili negativan.");
            return;
        }
        if(window.confirm("Jeste li sigurni da želite dodati nalog"))
        {
            select.map((z) => {
                dodajNalog(dodaj.brojnal, dodaj.polaziste, dodaj.odrediste, dodaj.svrha, dodaj.datum, dodaj.bDana, odobreno, z.id, dodaj.prijevoz)
            })
            
        }
        alert(`${dodaj.brojnal} ${dodaj.odrediste} je dodan`);
    }

    const handleChange = (e) => {                        
        const name = e.target.name;
        let value = e.target.value;                             
        setDodaj(values => ({ ...values, [name]: value}))        
    }    

    return (
        <>            
            <br />
            <form className="container" onSubmit={handleSubmit}>
                {/* <div className="mb-3">
                    <label className="form-label">Broj naloga</label>
                    <input type="number" className="form-control" placeholder="" name="brojnal" value={dodaj.brojnal || ""} onChange={handleChange} required/>
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Polazište</label>
                    <input type="text" className="form-control" placeholder="" name="polaziste" value={dodaj.polaziste || ""} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Odredište</label>
                    <input type="text" className="form-control" placeholder="" name="odrediste" value={dodaj.odrediste || ""} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Svrha</label>
                    <input type="text" className="form-control" placeholder="" name="svrha" value={dodaj.svrha || ""} onChange={handleChange} required/>
                </div>
                <div>
                    <DatePicker selected={startDate} dateFormat='dd.MM.yyyy' value={startDate} onChange={(date) => setStartDate(date)} includeDateIntervals={[{start: subDays(new Date(), 1), end: addDays(new Date(), 31)}]}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Broj dana</label>
                    <input type="number" className="form-control" placeholder="" name="bDana" value={dodaj.bDana || ""} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <Select options={zap} onChange={(values) => setSelect(values)} placeholder="Odaberi zaposlenike" searchable searchBy="osoba" labelField="osoba" valueField="id" clearable  dropdownHeight="200px" multi required/>
                </div>
                <div className="mb-3">
                    <select name="prijevoz" onChange={handleChange} className="form-select">
                        <option value="default" hidden>Odaberite vrstu prijevoza</option>
                        <option value="privatni">Privatni prijevoz</option>
                        <option value="sluzbeni">Službeni prijevoz</option>
                    </select>
                </div>               
                <button className="btn btn-outline-danger btn-md">Spremi nalog</button>
            </form>
        </>
    )
}

export default Dodaj