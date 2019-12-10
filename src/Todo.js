import Paper from "@material-ui/core/Paper";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import React, {useContext} from 'react';
import {TodoContext} from "./TodoContext";

export const Todo = (props) => {
    const [todos, setTodos] = useContext(TodoContext);
    const title=props.title;
    const id=props.id;
    const deleteTodo =(checked, id) => {
        let todo = todos.find(item => item.id === id);
        todo.done = true;
        setTodos(todos.filter(item => item.done === false));
    };

    return(
        <Paper
            square={false}
            className="todo"
        >
            <p>{title}</p>
            <FormControlLabel
                control={
                    <Checkbox
                        className="doneCheckbox"
                        color="primary"
                        onChange={({target})=>deleteTodo(target.checked, id)}/>
                }
                label="Done"
                labelPlacement="top"
            />
        </Paper>
    );
};