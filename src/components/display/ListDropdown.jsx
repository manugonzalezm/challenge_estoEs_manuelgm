import React from 'react'
import {
    Dropdown,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { getFirestore, deleteDoc, doc, getDocs, collection } from 'firebase/firestore';
import appFirebase from '../../firebase';
import { useDispatch } from 'react-redux/es/exports';
import { setTaskList } from '../../features/tasks/tasksSlice';

const db = getFirestore(appFirebase);

const ListDropdown = ({ taskId, size }) => {
    const dispatch = useDispatch()

    const getList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"))
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })

            dispatch(setTaskList(docs))
            // console.log("redux", docs)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to delete this task?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d33',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteDoc(doc(db, "tasks", id))
                getList()
                Swal.fire('Task deleted!', '', 'success')
            }
        })
    }

    return (
        <Dropdown drop="end">
            <Dropdown.Toggle as={Button} size={size} variant="outline-light" className="text-dark">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/tasks/${taskId}`}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={() => deleteTask(taskId)}>
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ListDropdown