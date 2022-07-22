import React from 'react'
import ListDropdown from './ListDropdown';
import Avatar from './Avatar';

const TaskItem = ({ t }) => {
    return (
        <tr key={t.id}>
            <td className='task-table-first-column'>{t.title}</td>
            <td><Avatar user={t.project_manager} />{t.project_manager}</td>
            <td><Avatar user={t.assigned_to} />{t.assigned_to}</td>
            <td>{t.status}</td>
            <td>
                <ListDropdown taskId={t.id} />
            </td>
        </tr>
    )
}

export default TaskItem