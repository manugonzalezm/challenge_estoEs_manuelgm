import React, { useState } from 'react';
import { getFirestore, query, where, collection, onSnapshot, getDocs } from 'firebase/firestore';
import appFirebase from '../firebase';
import {
    InputGroup,
    Form,
    Button
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setTaskList } from '../features/tasks/tasksSlice';
import Swal from 'sweetalert2';

const db = getFirestore(appFirebase)

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()

    const tasksRef = collection(db, "tasks")

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

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = () => {
        const q = query(tasksRef,
            where('title', '>=', search),
            where('title', '<=', `${search}z`)
        )
        onSnapshot(q, (snapshot) => {
            let tasks = []
            snapshot.docs.forEach((doc) => {
                tasks.push({ ...doc.data(), id: doc.id })
            })
            if(tasks.length>0){
                dispatch(setTaskList(tasks))
            } else{
                getList()
                setSearch("")
                Swal.fire({
                    title: "We couldn't find any task with that title",
                    text: 'Remember that the search is case-sensitive',
                    icon: 'error'
                })
            }
        })
    }

    return (
        <div className='d-flex align-items-center'>
            <InputGroup>
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={(e) => handleChange(e)}
                />
                <Button variant="outline-success" id="searchButton" type="submit" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </Button>
            </InputGroup>
        </div>
    )
}

export default SearchBar