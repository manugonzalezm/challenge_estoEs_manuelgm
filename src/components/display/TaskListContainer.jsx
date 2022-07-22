import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { 
    getFirestore, 
    collection, 
    getDocs, 
    deleteDoc 
} from 'firebase/firestore';
import {
    Container,
    Spinner
} from 'react-bootstrap';
import TaskList from "./TaskList";

import appFirebase from '../../firebase';
const db = getFirestore(appFirebase)

const TaskListContainer = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "tasks"))
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                })

                setList(docs)
                console.log(docs)
            } catch (err) {
                console.log(err)
            }
        }

        if (list.length === 0) {
            getList()
        }
    }, [list])
    //console.log(list)

    return (
        <div className="bg-light pt-5 list-container">
                {list.length===0 ?
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <Spinner animation="border" />
                    </div>
                :
                    <Container className="border bg-white shadow px-0">
                            <TaskList list={list} />
                    </Container>
                }
        </div>
    );
};

export default TaskListContainer;
