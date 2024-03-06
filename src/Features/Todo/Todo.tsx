import { Box, Button, List, ListItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../App/Store'
import { addTodo, deleteTodo, editTodo } from './TodoSlice'


interface Istate {
    todos: {
        id: number,
        content: string
    },
    editing: boolean
}

const Todo = () => {
    const { todos } = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch()
    const [state, setState] = useState<Istate['todos']>({
        id: 0,
        content: ''
    });
    const [editing, setEditing] = useState<Istate['editing']>(false);
    const [id, setId] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })

    }

    // handle add Todo

    const handleAdd = () => {
        const { content } = state

        if (state.content === '') {
            alert('cannot be empty!')
            return;
        }

        dispatch(addTodo(content))

        setState({ ...state, content: '' })

    }

    // handle Delete Todo

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id))

    }



    const handleEdit = (todo: { id: number, content: string }) => {
        setState({ ...state, content: todo.content })
        setEditing(true)
        setId(todo.id)
    }
    // console.log(todos)

    // update Todo
    function handleUpdate(id: number) {

        dispatch(editTodo({ id: id, content: state.content }));
        setState({ ...state, content: '' })
        setEditing(false)
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off"

                >
                    <TextField id="outlined-basic" variant="outlined" placeholder='enter Todo...'
                        name="content" value={state.content}
                        onChange={handleChange}
                    />

                </Box>
                {editing ? <Button variant='contained' sx={{ height: '48px', width: '15ch' }}
                    onClick={() => handleUpdate(id)} >Update</Button>
                    : <Button variant='contained' sx={{ height: '48px', width: '15ch' }}
                        onClick={handleAdd} >AddTodo</Button>}

            </Box >

            {/* todoItems */}

            <Box sx={{
                width: '45%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                flexWrap: 'wrap', bgcolor: '#ffffff',
                p: 7
            }}>
                {
                    todos.map((todo, index) => (
                        <List key={index} sx={{ border: '2px solid blue', mr: 2, mt: 2, p: 5, textAlign: 'center' }}>
                            <ListItem key={index}>{todo.content}</ListItem>
                            <Box>
                                <Button variant='outlined' sx={{ mr: '10px' }} disabled={editing}
                                    onClick={() => handleDelete(todo.id)}>Delete</Button>
                                <Button variant='outlined' onClick={() => handleEdit(todo)}>edit</Button>

                            </Box>
                        </List>
                    ))
                }
            </Box >
        </>
    )
}

export default Todo
