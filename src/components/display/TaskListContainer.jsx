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
    Button,
    Alert
} from 'react-bootstrap';
import TaskList from "./TaskList";
import { addTask, setTaskList } from "../../features/tasks/tasksSlice";

import appFirebase from '../../firebase';
const db = getFirestore(appFirebase)

const TaskListContainer = () => {
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.tasks)
    const { taskList } = tasks
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
            getList(dispatch(setTaskList()))
        }
    }, [taskList])

    return (
        <div className="bg-light pt-5 list-container">
                {loading ?
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <Spinner animation="border" />
                    </div>
                :
                    <Container className="border bg-white shadow px-0">
                        {!loading && (taskList && taskList.length===0) ?
                            <Alert key="light" variant="light">
                                No tasks found. To create one go to the 'Add project section'
                            </Alert>
                        :
                            <TaskList list={taskList} />
                        }
                    </Container>
                }
        </div>
    );
};

export default TaskListContainer;
