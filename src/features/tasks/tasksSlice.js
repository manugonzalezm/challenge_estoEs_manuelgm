import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskList: [],
    filterKeyword: "",
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

        }
    }
})

export const { setTaskList, addTask, editTask, deleteTask } = tasksSlice.actions

export default tasksSlice.reducer