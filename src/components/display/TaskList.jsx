import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Table,
    Button
} from 'react-bootstrap';
import TaskItem from './TaskItem';

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
                    <TaskItem key={t.id} t={t} />
                ))}
            </tbody>
        </Table>
    )
}

export default TaskList