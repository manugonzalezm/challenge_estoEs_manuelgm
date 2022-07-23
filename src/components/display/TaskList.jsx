import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    Button
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import Paginate from './Paginate';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks)
    const { taskList, currentPage, tasksPerPage } = tasks

    return (
        <>
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
        </>
    )
}

export default TaskList