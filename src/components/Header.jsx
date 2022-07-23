import React from 'react';
import{ Navbar, Container, Button } from 'react-bootstrap';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Logo } from '../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus, 
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';
import { setFilterKeyword, setPage, setTaskList } from '../features/tasks/tasksSlice';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import appFirebase from '../firebase';

const db = getFirestore(appFirebase)

const Header = () => {
    let location = useLocation();
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const getList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"))
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })

            dispatch(setTaskList(docs))
        } catch (err) {
            console.log(err)
        }
    }

    const handleClickLogo = () => {
        dispatch(setPage(1));
        dispatch(setFilterKeyword(""));
        getList();
        navigate("/", { replace: true })
    }

    return (
        <>
            <Navbar className="border-bottom">
                <Container>
                    <Navbar.Brand onClick={handleClickLogo}>
                        <Link to="/" >
                            <img
                                src={Logo}
                                className="d-inline-block align-top"
                                alt="Estoes logo"
                            />
                        </Link>
                    </Navbar.Brand>
                    <SearchBar />
                </Container>
            </Navbar>
            <Navbar className="border-bottom">
                <Container>
                    {location.pathname==="/" ?
                        <Navbar.Brand>
                            <h4 className='m-0'>
                                My projects
                            </h4>
                        </Navbar.Brand>
                    : (
                        location.pathname==="/tasks/new" ?
                            <div className='d-flex justify-content-center align-items-center'>
                                <Link to="/">
                                    <Button variant="outline-light" className="text-secondary">
                                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                                    </Button>
                                </Link>
                                <Navbar.Brand>
                                    <h4 className='m-0'>
                                        Add project
                                    </h4>
                                </Navbar.Brand>
                            </div>
                        :
                            <div className='d-flex justify-content-center align-items-center'>
                                <Link to="/">
                                    <Button variant="outline-light" className="text-secondary">
                                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                                    </Button>
                                </Link>
                                <Navbar.Brand >
                                    <h4 className='m-0'>
                                        Edit project
                                    </h4>
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