import React from 'react';
import {
    Table
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import Paginate from './Paginate';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks)
    const { taskList, currentPage, tasksPerPage } = tasks

    return (
        <>
            <div className='d-none d-md-block'>
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
                        {taskList && taskList.slice(
                            (currentPage - 1) * tasksPerPage,
                            (currentPage - 1) * tasksPerPage + tasksPerPage
                            ).map(t => {
                                return(
                                    <TaskItem key={t.id} t={t} />
                                )
                            }
                        )}
                    </tbody>
                </Table>
                <Paginate />
            </div>
            <div className='d-block d-md-none'>
                <div className="d-flex list-items-mobile">
                    {taskList && taskList.slice(
                        (currentPage - 1) * tasksPerPage,
                        (currentPage - 1) * tasksPerPage + tasksPerPage
                        ).map(t => {
                            return(
                                <TaskItem key={t.id} t={t} />
                            )
                        }
                    )}
                    <div className="mt-3">
                        <Paginate/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskList