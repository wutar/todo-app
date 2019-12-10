import React, {createContext, useState} from 'react'
import {InitialData} from "./InitialData";

export const TodoContext = createContext([[], function(){}]);

export const TodoProvider = (props) => {
    const [todos, setTodos] = useState(InitialData);
    return(
        <TodoContext.Provider value={[todos,setTodos]}>
            {props.children}
        </TodoContext.Provider>
    );
};