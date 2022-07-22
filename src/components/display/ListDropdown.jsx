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

const ListDropdown = ({ taskId }) => {
    return (
        <Dropdown drop="end">
            <Dropdown.Toggle as={Button} variant="outline-light" className="text-dark">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/tasks/${taskId}`}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={() => console.log("Deleted")}>
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ListDropdown