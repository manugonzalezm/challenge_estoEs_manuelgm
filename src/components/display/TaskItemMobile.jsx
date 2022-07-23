import React from 'react'
import Avatar from './Avatar'
import ListDropdown from './ListDropdown'

const TaskItemMobile = ({ t }) => {
    return (
        <div className='d-block d-md-none border w-100'>
            <div className=' item-mobile'>
                <div className='item-content-mobile py-3 ps-3'>
                    <h6 className='title-mobile'>
                        {t.title}
                    </h6>
                    <h6 className='date text-muted'>
                        Creation date: {t.creation_date_parsed}
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
    )
}

export default TaskItemMobile