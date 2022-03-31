import React, { useState } from 'react';
import './listingtodo.scss';
import axios from 'axios';

const Listingtodo = (props) => {
    const [todos, setTodos] = useState([]);

    React.useEffect( () => {
        axios.get("/api/todo/")
        .then(res => {
            let temp = [];
            res.data.forEach(curr => {
                if(curr.gid === props.groupid){
                    temp.push(curr);
                    return;
                }
            });
            setTodos(temp);
        })
        .catch(err => {
            setTodos(null);
        });
    },[]);

    return (
        <div className='lst-todo-wrap'>
            <h4>To-Dos</h4>
            <ul>
                {
                    todos === null || todos.length === 0 ? <li>You don't have any To-Dos yet</li> : todos.map(todo => <li key={todo._id}><a href={'/detail-todo/' + todo._id}>{todo.name}</a></li>)
                }
            </ul>
        </div>
    );
}

export default Listingtodo;