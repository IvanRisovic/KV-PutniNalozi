import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { Outlet, NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Navibar = () => {
    function logout()
    {
        localStorage.clear();        
        window.location.href = '/';
    }
    var set = localStorage.getItem('login');
    if(set == '1')
    {
        return (
            <>
            <Navbar bg="danger" variant="dark">
                <Container>                    
                    <Nav id="navigacija" className="me-auto">
                        <NavLink to="./Dodaj" className="navbar-brand">Dodaj nalog</NavLink> 
                        <NavLink to="/Navigacija/" className="navbar-brand">Pregled naloga</NavLink>
                                        
                    </Nav>
                    <Nav>
                        <button type="button" onClick={logout} className="btn btn-outline-warning d-flex">Odjava</button>
                    </Nav>
                </Container>
            </Navbar>
            <div className="container">
                <Outlet/>
            </div>
            </>
        )
    }
    else if(set == '2')
    {
        return (
            <>
            <Navbar bg="danger" variant="dark">
                <Container>                    
                    <Nav id="navigacija" className="me-auto">
                        <NavLink to="./Dodaj" className="navbar-brand">Dodaj nalog</NavLink> 
                        <NavLink to="/Navigacija/" className="navbar-brand">Pregled naloga</NavLink>
                        <NavLink to="./Odobri" className="navbar-brand">Odobri nalog</NavLink>      
                    </Nav>
                    <Nav>
                        <button type="button" onClick={logout} className="btn btn-outline-warning d-flex">Odjava</button>
                    </Nav>
                </Container>
            </Navbar>
            <div className="container">
                <Outlet/>
            </div>
            </>
        )
    }
    else
    {
        return(
            <>
                {alert("Morate se prijaviti u aplikaciju.")}
                <Button onClick={logout}>Nazad</Button>
            </>
        )
    }
    
}

export default Navibar