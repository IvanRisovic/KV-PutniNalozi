import axios from "axios";
import { useEffect, useState } from "react";
import { MDBDataTableV5, MDBDataTable } from 'mdbreact';
import { Button, FloatingLabel, Form, FormLabel, Modal, ModalBody } from "react-bootstrap";
import {format} from 'date-fns';
import {FileSaver} from 'file-saver';
import { saveAs } from 'file-saver';
import * as ReactDOMServer from 'react-dom/server';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Printer, { print } from 'react-pdf-print'

const ids = ['1'];

const readURL = "http://localhost:8080/KV-PutniNalozi/backend/read.php";

const Nalozi = () => {
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

    function Delete(id) {
        window.alert("Jeste li sigurni da želite obrisati nalog?")
        deleteConfirm(id)
    }

    function deleteConfirm(brojnal) {
        if (window.confirm("Jeste li sigurni?")) 
        {
            var params = new URLSearchParams();
            params.append('brojnal', brojnal);
            axios.post('http://localhost:8080/KV-PutniNalozi/backend/delete.php', params).then((response) => {
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
            prijevoz: show.prijevoz,                
        }) 
        setZap(show.zaposlenik)

        setShow(true); 
    } 
    
    const printDocument = () => {
        const input = document.getElementById('print');
        html2canvas(input).then((canvas) => {            
            const pdf = new jsPDF();
            pdf.fromHTML(ReactDOMServer.renderToString(ModalBody))
            // pdf.output('dataurlnewwindow');
            pdf.save("Nalog.pdf");
          });
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
            label: 'Obriši',
            field: 'obrisi',
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
            obrisi: <button className="btn btn-outline-danger" onClick={() => Delete(nalog.brojnal)}>Obriši</button>
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
                <Printer>    
                <Modal.Body id={ids[0]} style={{ width:'210mm', height: '297mm' }}>
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
                        <FloatingLabel label="Vrsta prijevoza">
                            <Form.Control name="prijevoz" value={input.prijevoz || ""}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FormLabel>Zaposlenici</FormLabel> 
                        <MDBDataTableV5 hover data={dataTable} paging={false} searching={false} pagination={false}/>                       
                    </Form.Group> 
                                       
                </Modal.Body> 
                </Printer> 
                <Modal.Footer>
                    <Form.Group>
                        <Button onClick={() => print(ids)} variant="outline-danger">Preuzmi</Button>
                    </Form.Group>
                </Modal.Footer>              
            </Modal>       
        </>
    )
}

export default Nalozi