import React from 'react'
import ListDropdown from './ListDropdown';
import Avatar from './Avatar';

const TaskItem = ({ t }) => {
    const date = (((t.creation_date).toDate()))
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), date.getMinutes()];

    return (
        <>
            <tr className='d-none d-md-table-row'>
                <td className='task-table-first-column'>
                    <div className='d-flex flex-column justify-content-center align-items-start'>
                        {t.title}
                        <span className='creation-date font-weight-light text-muted'>
                            Creation date: {`${day}/${month+1}/${year} ${hour}:${minutes<=9 ? "0" : ""}${minutes}`}
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
            <div className='d-block d-md-none border w-100'>
                <div className=' item-mobile'>
                    <div className='item-content-mobile py-3 ps-3'>
                        <h6 className='title-mobile'>
                            {t.title}
                        </h6>
                        <h6 className='date text-muted'>
                            Creation date: {`${day}/${month+1}/${year} ${hour}:${minutes<=9 ? "0" : ""}${minutes}`}
                        </h6>
                        <div className='d-flex align-items-center'>
                            <Avatar user={t.assigned_to} />
                            <h6 className='assigned-to-mobile'>
                                {t.assigned_to}
                            </h6>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-start pt-3 pe-3'>
                        <ListDropdown taskId={t.id} size="lg" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskItem