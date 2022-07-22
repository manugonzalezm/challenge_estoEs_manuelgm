import React from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    Button
} from 'react-bootstrap';

const TaskList = (props) => {
    const tasks = useSelector((state) => state.tasks)

    const { list } = props

    return (
        <Table>
            <thead className="bg-light">
                <tr>
                    <th>Project info</th>
                    <th>Project Manager</th>
                    <th>Assigned to</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list.map(t => (
                    <tr key={t.id}>
                        <td>{t.title}</td>
                        <td>{t.project_manager}</td>
                        <td>{t.assigned_to}</td>
                        <td>{t.status}</td>
                        <td>
                            <Button variant="outline-light" className="text-dark">
                                Icon ...
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TaskList