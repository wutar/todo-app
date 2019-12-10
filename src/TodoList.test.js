import React from "react";
import {TodoList} from "./TodoList";
import { mount} from 'enzyme';
import {InitialData} from "./InitialData";
import App from "./App";


describe("TodoList", () => {
    it("renders", () => {
        mount(<TodoList />)
    });

    it("Initially displays todo items from initialdata.js", () => {
        const todoList = mount(<App/>);
        expect(todoList.find("li")).toHaveLength(InitialData.length);
    });

    it("Adds a new todo when the button is clicked", () =>{
        const todoList = mount(<App/>);
        todoList.find("input[type='text']").simulate('change', {target:{value: "New Todo Item added"}});
        todoList.find("button").first().simulate("click");
        expect(todoList.find("li p").last().text()).toEqual("New Todo Item added");
    });

    it("clears textfield after new todo is added", () =>{
        const todoList = mount(<App/>);
        todoList.find("input[type='text']").simulate('change', {target:{value: "New Todo Item added"}});
        todoList.find("button").first().simulate("click");
        expect(todoList.find("input[type='text']").props().value).toEqual("");
    });

    it("Removes a todo item when it is checked", () =>{
        const todoList = mount(<App />);
        const firstCheckbox = todoList.find("input[type='checkbox']").first();
        firstCheckbox.simulate("change");
        expect(todoList.find("li p").first().text()).toEqual("Second Todo item");
    });

    it("does not add empty todos", () =>{
        const todoList = mount(<App/>);
        todoList.find("input[type='text']").simulate('change', {target:{value: ""}});
        todoList.find("button").first().simulate("click");
        expect(todoList.find("li p").last().text()).toEqual("Third Todo item");
    });

    it("Shows error when an empty todo is tried to be added", () =>{
        const todoList = mount(<App/>);
        todoList.find("input[type='text']").simulate('change', {target:{value: ""}});
        todoList.find("button").first().simulate("click");
        expect(todoList.find(".error")).toHaveLength(1);
        expect(todoList.find(".error").first().text()).toEqual("You should enter a value");
    });

    it("Only shows 1 error when attempting multiple times to add an empty todo", () =>{
        const todoList = mount(<App/>);
        todoList.find("input[type='text']").simulate('change', {target:{value: ""}});
        todoList.find("button").first().simulate("click");
        todoList.find("button").first().simulate("click");
        expect(todoList.find(".error")).toHaveLength(1);
    });
});

