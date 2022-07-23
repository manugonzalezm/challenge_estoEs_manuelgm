import React from 'react'
import ListDropdown from './ListDropdown';
import Avatar from './Avatar';

const TaskItem = ({ t }) => {
    return (
            <tr className='d-none d-md-table-row'>
                <td className='task-table-first-column'>
                    <div className='d-flex flex-column justify-content-center align-items-start'>
                        {t.title}
                        <span className='creation-date font-weight-light text-muted'>
                            Creation date: {t.creation_date_parsed}
                        </span>
                    </div>
                </td>
                <td>
                    <div className="d-flex align-items-center">
                        <Avatar user={t.project_manager}/>
                        <span className='avatar-name'>{t.project_manager}</span>
                    </div>
                </td>
                <td>
                <div className="d-flex align-items-center">
                    <Avatar user={t.assigned_to} />
                        <span className='avatar-name'>{t.assigned_to}</span>
                    </div>
                </td>
                <td>
                    <div className='row-centered'>
                        <span className='status border bg-light py-1 px-2 rounded'>
                            {t.status}
                        </span>
                    </div>
                </td>
                <td>
                    <ListDropdown taskId={t.id} size=""/>
                </td>
            </tr>
    )
}

export default TaskItem