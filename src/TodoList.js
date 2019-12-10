import React, { useContext, useState} from 'react';

import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";

import TextField from "@material-ui/core/TextField";
import  {TodoContext} from "./TodoContext";
import {Todo} from "./Todo";
import {useId} from "react-id-generator";

export const TodoList = () => {
    const [todos, setTodos] = useContext(TodoContext);
    const [inputText, setInputText] = useState("");
    const [errors, setErrors] = useState([]);
    const todoIndex = useId();

    const addError= (errorText)=>{
        const errorKey = errors.length + 1;
        const error = {key:"error-"+errorKey, text:errorText};
        setErrors([...errors, error]);
    };
    const addTodo = () => {
        const title = inputText;
        errors.splice(0,errors.length);
        if(title===""){
            addError("You should enter a value");
        }
        else{

            const todo = {id:"todo-"+todoIndex, title:title, done:false};
            setTodos([...todos, todo]);
            setInputText("");
        }
    };

    const changeInputText = (event) =>{
        setInputText(event.target.value);
    };


    return(
        <Container
            maxWidth={"sm"}
        >
            <h1>To-do list</h1>
            <List>
               {todos.map(todo =>(
                   <li key={todo.id}>
                       <Todo
                        title={todo.title}
                        id={todo.id}
                       />
                   </li>
               ))}
            </List>
            <div>
                <TextField id="outlined-basic" label="Todo title" variant="outlined" value={inputText} onChange={changeInputText} />
                <Button onClick={addTodo}>Add</Button>
            </div>
            <ul>
                {
                    errors.map(error =>(
                        <li className="error" key={error.key}>{error.text}</li>
                    ))
                }
            </ul>
        </Container>
    );
};

