import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import ListDropdown from './ListDropdown';

const TaskList = (props) => {
    const tasks = useSelector((state) => state.tasks)

    const { list } = props

    return (
        <Table>
            <thead className="bg-light">
                <tr>
                    <th className='task-table-first-column'>Project info</th>
                    <th>Project Manager</th>
                    <th>Assigned to</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list.map(t => (
                    <tr key={t.id}>
                        <td className='task-table-first-column'>{t.title}</td>
                        <td>{t.project_manager}</td>
                        <td>{t.assigned_to}</td>
                        <td>{t.status}</td>
                        <td>
                            <ListDropdown taskId={t.id}/>
                            {/* <Button variant="outline-light" className="text-dark">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </Button> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TaskList