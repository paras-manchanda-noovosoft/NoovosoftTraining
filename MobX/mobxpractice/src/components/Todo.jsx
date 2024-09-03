import React from 'react';
import {observer} from 'mobx-react';

const TodoComponent = observer (({todoObj}) => {
    return (
        <div>
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
        </div>
    );
});

export default TodoComponent;