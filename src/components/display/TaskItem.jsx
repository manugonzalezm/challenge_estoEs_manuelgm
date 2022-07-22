import React from 'react'
import ListDropdown from './ListDropdown';
import Avatar from './Avatar';

const TaskItem = ({ t }) => {
    const date = (((t.creation_date).toDate()))
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), date.getMinutes()];

    return (
        <tr key={t.id}>
            <td className='task-table-first-column'>
                <div className='d-flex flex-column justify-content-center align-items-start'>
                    {t.title}
                    <span className='creation-date font-weight-light text-muted'>
                        Creation date: {`${day}/${month+1}/${year} ${hour}:${minutes<=9 ? "0" : ""}${minutes}`}
                    </span>
                </div>
            </td>
            <td><Avatar user={t.project_manager} />{' '}{t.project_manager}</td>
            <td><Avatar user={t.assigned_to} />{' '}{t.assigned_to}</td>
            <td>
                <div className='row-centered'>
                    <span className='status border bg-light py-1 px-2 rounded'>
                        {t.status}
                    </span>
                </div>
            </td>
            <td>
                <ListDropdown taskId={t.id} />
            </td>
        </tr>
    )
}

export default TaskItem