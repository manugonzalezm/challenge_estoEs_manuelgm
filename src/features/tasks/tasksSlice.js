import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskList: [],
    filterKeyword: "",
    currentPage: 1,
    tasksPerPage: 5
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTaskList: (state, action) => {
            return({
                ...state,
                taskList: action.payload
            })
        },
        setFilterKeyword: (state, action) => {
            return({
                ...state,
                filterKeyword: action.payload
            })
        },
        setPage: (state, action) => {
            return({
                ...state,
                currentPage: action.payload
            })
        }
    }
})

export const { setTaskList, setPage, setFilterKeyword } = tasksSlice.actions

export default tasksSlice.reducer