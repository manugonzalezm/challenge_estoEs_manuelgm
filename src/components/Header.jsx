import React from 'react';
import{ Navbar, Container } from 'react-bootstrap';
import logo from '../assets/images/logo.png'; 

const Header = () => {
    return (
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
    )
}

export default Header