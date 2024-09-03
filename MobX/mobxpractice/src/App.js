import React from 'react';
import './App.css';
import Todo from './todo';
import TodoComponent from "./components/Todo";

const todoObj = new Todo();

function App() {
    todoObj.addTask("task 1")
    console.log(JSON.parse(JSON.stringify(todoObj)))
    return (
        <>
            <h1>Hello World</h1>
            <h1>Todo List</h1>
            <ul>
                {todoObj.todo.map((todo, index) => (
                    <li key={index}>
                {todo.task}
                <input
                    type="checkbox"
                    checked={todo.isFinished}
                    onChange={() => todo.isFinished = !todo.isFinished}
                />
                </li>
                ))}
            </ul>
            <TodoComponent todoObj={todoObj}/>
        </>
    );
}

export default App;
