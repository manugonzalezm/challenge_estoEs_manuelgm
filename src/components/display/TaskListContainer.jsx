import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    getFirestore, 
    collection, 
    getDocs
} from 'firebase/firestore';
import {
    Container,
    Spinner,
    Alert,
    Badge
} from 'react-bootstrap';
import TaskList from "./TaskList";
import { setFilterKeyword, setTaskList, setPage } from "../../features/tasks/tasksSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import appFirebase from '../../firebase';
const db = getFirestore(appFirebase)

const TaskListContainer = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks)
    const { taskList, filterKeyword } = tasks

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getList = async () => {
            setLoading(true)
            try {
                const querySnapshot = await getDocs(collection(db, "tasks"))
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                })

                dispatch(setTaskList(docs))
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }

        if (taskList && taskList.length === 0) {
            getList()
            dispatch(setPage(1))
        }
    }, [taskList])

    const getList = async () => {
        setLoading(true)
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"))
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })

            dispatch(setTaskList(docs))
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSearchReset = () => {
        dispatch(setFilterKeyword("")); 
        dispatch(setPage(1))
        getList();
    }

    return (
        <div className="bg-light pt-4 list-container">
                {loading ?
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <Spinner animation="border" />
                    </div>
                :
                    <>
                        {filterKeyword!=="" &&
                        <div className="mx-3 mb-3">
                            <h4>
                                <Badge bg="primary">
                                    Results for: {filterKeyword} 
                                    <FontAwesomeIcon 
                                        className="reset-search-button"
                                        onClick={() => handleSearchReset()} 
                                        icon={faXmark}
                                    />
                                </Badge>
                            </h4>
                        </div>
                        }
                        <Container className="border bg-white shadow px-0 d-none d-md-block">
                            {!loading && (taskList && taskList.length===0) ?
                                <Alert key="light" variant="light">
                                    No tasks found. To create one go to the 'Add project section'
                                </Alert>
                            :
                                <TaskList />
                            }
                        </Container>
                        <Container className="border bg-white shadow px-0 d-block d-md-none" fluid>
                            {!loading && (taskList && taskList.length===0) ?
                                <Alert key="light" variant="light">
                                    No tasks found. To create one go to the 'Add project section'
                                </Alert>
                            :
                                <TaskList />
                            }
                        </Container>
                    </>
                }
        </div>
    );
};

export default TaskListContainer;
