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
            console.log(action.payload)
            return({
                ...state,
                taskList: action.payload
            })
        },
        addTask: (state, action) => {
            return({
                ...state,
                taskList: [...state.taskList, action.payload]
            })
        },
        editTask: (state, action) => {

        },
        deleteTask: (state, action) => {

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

export const { setTaskList, addTask, editTask, deleteTask, setPage, setFilterKeyword } = tasksSlice.actions

export default tasksSlice.reducer