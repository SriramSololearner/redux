import { createSlice } from "@reduxjs/toolkit";

export const todoSlider = createSlice({
    name: 'todo',
    initialState: {
        todos: [
            { id: 1, content: 'task2' },
            { id: 2, content: 'task1' }
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            let newTodo = {
                id: Math.random(),
                content: action.payload
            }

            state.todos.unshift(newTodo);
        },

        deleteTodo: (state, action) => {

            let { todos } = state;
            console.log(action.payload);

            // const objId = todos.findIndex((obj) => obj.id === action.payload)
            state.todos = todos.filter((item) => item.id !== action.payload)

            // using  diffrent Approaches
            // 1- Using find method and filter method together
            // 2- Using only the filter method
            // 3- Using only the splice method
        },

        editTodo: (state, action) => {

            let { todos } = state
            let { payload } = action
            console.log(payload);

            const updatedData = todos.map((item) => {
                if (item.id === payload.id) {
                    return payload
                } else {
                    return item
                }
            })

            state.todos = updatedData

        }

    }
}); 


export const { addTodo, deleteTodo, editTodo } = todoSlider.actions;
export default todoSlider.reducer