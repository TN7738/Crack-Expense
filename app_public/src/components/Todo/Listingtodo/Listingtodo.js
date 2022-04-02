import React, { useState } from 'react';
import './listingtodo.scss';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Listingtodo = (props) => {
    const cookies = new Cookies();
    let isPremium;
    const [todos, setTodos] = useState([]);

    if(document.cookie.indexOf('usrDtl') !== -1){
        isPremium = cookies.get('usrDtl').premium;
    }

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
                    todos === null || todos.length === 0 ? <li>You don't have any To-Dos yet</li> : todos.map(todo => <li key={todo._id}><a href={isPremium ? '/detail-todo/' + todo._id : '/payment/' + props.groupid + '/' + todo._id}>{todo.name}</a></li>)
                }
            </ul>
        </div>
    );
}

export default Listingtodo;