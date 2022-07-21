import React from 'react';
import{ Navbar, Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png'; 

const Header = () => {
    let location = useLocation();
    console.log(location)

    return (
        <>
            <Navbar className="border-bottom">
                <Container>
                    <Navbar.Brand > {/* Despues poner link al home */}
                        <img
                            src={logo}
                            className="d-inline-block align-top"
                            alt="Estoes logo"
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Navbar className="border-bottom">
                <Container>
                    {location.pathname==="/" ?
                        <Navbar.Brand >
                            My projects
                        </Navbar.Brand>
                    : (
                        location.pathname==="/tasks" ?
                            <div className='d-flex justify-content-center'>
                                <Button variant="outline-light" className="text-secondary">ICONO Back</Button>
                                <Navbar.Brand>
                                    Add project
                                </Navbar.Brand>
                            </div>
                        :
                            <div className='d-flex justify-content-center'>
                                <Button variant="outline-light" className="text-secondary">ICONO Back</Button>
                                <Navbar.Brand >
                                    Edit project
                                </Navbar.Brand>
                            </div>
                    )
                    }
                    
                    <Button variant="danger">
                        + Add project
                    </Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header