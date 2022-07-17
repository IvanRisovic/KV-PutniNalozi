import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './css/style.css';

const Login = () => {
    const loginURL = 'http://localhost:8080/KV-PutniNalozi/backend/login.php';

    
    const[input, setInput] = useState([]);
    let navigate = useNavigate();   
      
    const handleSubmit = (e) => {
        e.preventDefault();
        var params = new URLSearchParams();
        params.append('uname', input.username);
        params.append('pass', input.password);
        axios.post(loginURL, params).then((response) => {
            if(response.data[0])
            {
                localStorage.setItem("login", response.data[2])
                console.log(response.data);
                navigate("/Navigacija/", {replace: true});
            }
            setInput([])
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({ ...values, [name]: value }))
      }
        
    return (
        <>
        
            <Form onSubmit={handleSubmit} className="form-login">
                <h1 className="heading">Prijava</h1>
                <Form.Group className="mb-4">
                    <Form.Label>Korisničko ime</Form.Label>
                    <Form.Control className="inpt" name="username" onChange={handleChange} type="text"/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control className="inpt" name="password" onChange={handleChange} type="password"/>
                </Form.Group>
                <Button id="submit" variant="outline-danger" type="submit">Prijava</Button>
            </Form>
        </>
    )
}

export default Login