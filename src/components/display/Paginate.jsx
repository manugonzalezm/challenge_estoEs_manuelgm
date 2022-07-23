import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/tasks/tasksSlice';

const Paginate = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks)
    const { currentPage, taskList, tasksPerPage } = tasks
    const pages = []
    if(taskList && taskList.length>0){
        for(let p=0; p<(Math.round((taskList.length)/tasksPerPage)); p++){
            pages.push(p+1)
        }
    }

    const handleClick = (num) => {
        dispatch(setPage(num))
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
        {(taskList && taskList.length>0) ?
            <Pagination>
                <Pagination.First disabled={currentPage===1} onClick={() => handleClick(1)}/>
                <Pagination.Prev disabled={currentPage===1} onClick={() => handleClick(currentPage-1)}/>
                {
                    pages && pages.length>0 && pages.map(p => (!(p<currentPage-2) && (p<currentPage) &&
                        <Pagination.Item key={p} onClick={() => handleClick(p)}>
                            {p}
                        </Pagination.Item>
                    ))
                }
                <Pagination.Item active>
                            {currentPage}
                </Pagination.Item>
                {
                    pages && pages.length>0 && pages.map(p => ((p<currentPage+3) && (p>currentPage) &&
                        <Pagination.Item key={p} onClick={() => handleClick(p)}>
                            {p}
                        </Pagination.Item>
                    ))
                }
                <Pagination.Next disabled={currentPage===pages[pages.length-1]} onClick={() => handleClick(currentPage+1)}/>
                <Pagination.Last disabled={currentPage===pages[pages.length-1]} onClick={() => handleClick(pages[pages.length-1])}/>
            </Pagination>
        :
            <></>
        }
        </div>
    )
}

export default Paginate