import React from 'react';
import{ Navbar, Container, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { Logo } from '../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus, 
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    let location = useLocation();
    console.log(location)

    return (
        <>
            <Navbar className="border-bottom">
                <Container>
                    <Navbar.Brand >
                        <Link to="/">
                            <img
                                src={Logo}
                                className="d-inline-block align-top"
                                alt="Estoes logo"
                            />
                        </Link>
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
                        location.pathname==="/tasks/new" ?
                            <div className='d-flex justify-content-center'>
                                <Link to="/">
                                    <Button variant="outline-light" className="text-secondary">
                                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                                    </Button>
                                </Link>
                                <Navbar.Brand>
                                    Add project
                                </Navbar.Brand>
                            </div>
                        :
                            <div className='d-flex justify-content-center'>
                                <Link to="/">
                                    <Button variant="outline-light" className="text-secondary">
                                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                                    </Button>
                                </Link>
                                <Navbar.Brand >
                                    Edit project
                                </Navbar.Brand>
                            </div>
                    )
                    }
                    {location.pathname==="/" ?
                        <Link to="/tasks/new">
                            <Button variant="danger">
                                <FontAwesomeIcon icon={faPlus} /> Add project
                            </Button>
                        </Link>
                    : 
                        <></>
                    }
                </Container>
            </Navbar>
        </>
    )
}

export default Header