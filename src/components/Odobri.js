import axios from "axios";
import { useEffect, useState } from "react";
import { MDBDataTableV5, MDBDataTable } from 'mdbreact';
import { Button, FloatingLabel, Form, FormLabel, Modal, ModalBody } from "react-bootstrap";
import {format} from 'date-fns';

const readURL = "http://localhost:8080/KV-PutniNalozi/backend/readOdobri.php";

const Odobri = () => {
    const [post, setPost] = useState([]);
    const [zap, setZap] = useState([]);
    const [show, setShow] = useState(false);
    const [input, setInput] = useState([]);

    function getNalog() {
        axios.get(readURL).then((response) => {
            setPost(response.data);
            setZap(response.data); 
            console.log(response.data)
            console.log(response.data)            
        })
    }

    useEffect(() => {
        getNalog();
    }, [])

    useEffect(() => {
        zap.map((z) => {
            dataTable.rows.push({
                ime: z.ime,
                prezime: z.prezime
            })
        })
    }, [zap])

    function Allow(id) {
        window.alert("Jeste li sigurni da želite odobriti nalog?")
        allowConfirm(id)
    }

    function allowConfirm(brojnal) {
        if (window.confirm("Jeste li sigurni?")) 
        {
            var params = new URLSearchParams();
            params.append('brojnal', brojnal);
            axios.post('http://localhost:8080/KV-PutniNalozi/backend/Allow.php', params).then((response) => {
                setPost([]); getNalog()
            })
        }
    } 
    
    function handleClose()
    {
        setShow(false);
    }

    const dataTable = {
        columns: [
        {
            label: 'Ime',
            field: 'ime',
            sort: 'asc',            
        },
        {
            label: 'Prezime',
            field: 'prezime',            
        },
    ],
        rows: []
    }

    function handelShow(brojnal)
    {
        let show = post.find(show => {
            return show.brojnal === brojnal;
        })   
            
        setInput({
            brojnal: show.brojnal,
            polaziste: show.polaziste,
            odrediste: show.odrediste,
            svrha:show.svrha,
            datum: format(new Date(show.datum), "dd.MM.yyyy"),
            brojdana: show.bDana,
            odobreno: (show.odobreno) ? "Da" : "Ne",                
        }) 
        setZap(show.zaposlenik)

        setShow(true); 
    }   
        

    if (!post) return null;   
    
    const tableData = {
        columns: [{
            label: 'Broja naloga',
            field: 'brojnal',
            sort: 'asc',
            width: 150,
        },
        {
            label: 'Polazište',
            field: 'polaziste',
            sort: 'asc',
            width: 250,
        },
        {
            label: 'Odredište',
            field: 'odrediste',
            sort: 'asc',
            width: 250,
        },
        {
            label: 'Svrha',
            field: 'svrha',
            sort: 'asc',
            width: 200,
        },
        {
            label: 'Datum',
            field: 'datum',
            sort: 'asc',
            width: 100,
        },
        {
            label: 'Broj dana',
            field: 'brdan',
            sort: 'asc',
            width: 50,
        },
        {
            label: 'Odobreno',
            field: 'odobreno',
            sort: 'asc',
            width: 50,
        },
        {
            label: 'Detalji naloga',
            field: 'detalji',
            sort: 'asc',
            width: 300
        },
        {
            label: 'Odobri',
            field: 'odobri',
            width: 100
        }
    ], 
               
        rows: post.map((nalog) => ({
            brojnal: nalog.brojnal,
            polaziste: nalog.polaziste,
            odrediste: nalog.odrediste,
            svrha: nalog.svrha,
            datum: format(new Date(nalog.datum), "dd.MM.yyyy"),
            brdan: nalog.bDana,
            odobreno: (nalog.odobreno == 1) ? "Da" : "Ne",
            detalji: <button className="btn btn-outline-success" onClick={() => handelShow(nalog.brojnal)}>Detalji naloga</button>,
            odobri: <button className="btn btn-outline-danger" onClick={() => Allow(nalog.brojnal)}>Odobri</button>
        })),
    }
    return (
        <>
            
            <div className="container">
                <MDBDataTableV5 striped hover data={tableData}/> 
            </div>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Detalji naloga</Modal.Title>    
                </Modal.Header>                    
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Broj naloga">
                            <Form.Control name="brojnal" value={input.brojnal || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Polazište">
                            <Form.Control name="polaziste" value={input.polaziste || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Odredište">
                            <Form.Control name="odredište" value={input.odrediste || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Svrha">
                            <Form.Control name="svrha" value={input.svrha || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Datum">
                            <Form.Control name="datum" value={input.datum || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Broj dana">
                            <Form.Control name="bDana" value={input.brojdana || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Odobreno">
                            <Form.Control name="odobreno" value={input.odobreno || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FormLabel>Zaposlenici</FormLabel> 
                        <MDBDataTableV5 hover data={dataTable}/>                       
                    </Form.Group>                    
                </Modal.Body> 
                                           
            </Modal>       
        </>
    )
}

export default Odobri