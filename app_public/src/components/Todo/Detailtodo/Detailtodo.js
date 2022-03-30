import React, { useState } from 'react';
import './detailtodo.scss';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Detailtodo = () => {
    let history = useHistory();
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    let { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [list, setList] = useState([]);
    
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/todo/"+id)
            .then(res => {
                setTodos(res.data);
                return(
                    res.data.list.forEach(elem => {
                        setList((list) => [...list, elem]);
                    })
                )
            });
    }, []);

    const setListItem = (indx) => {
        let temp = list;
        temp[indx].status = !temp[indx].status;
        setList(temp);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const todoData = {
            name: todos.name,
            gid: id,
            list: list
        };

        axios.put("http://localhost:3000/api/todo"+id, todoData)
            .then(res => {
                console.log("success");
            })
    };

    const deleteTodo = () => {
        axios.delete("http://localhost:3000/api/todo/"+id)
        .then(res => {
            history.push("/group/"+todos.gid);
        })
    }
    return (
        <div className='dtl-todo-wrap'>
             <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <h4>{todos.name}</h4>
                    <div className='inner-wrap'>
                        <form onSubmit={e => { onSubmit(e) }}>
                            <div className='list-wrap'>
                                {
                                    list.map((todo, indx) => <p key={todo._id}><label htmlFor={indx}>{todo.todolist}<input type="checkbox" id={indx} name={indx} value={indx} defaultChecked={todo.status} onChange={e => setListItem(indx)}></input></label></p>)
                                }
                            </div>
                            <div className='btn-wrap'>
                                <input type="submit" className="create-btn" value="Update"></input>
                                <a className='dlt' onClick={e => { deleteTodo() }}><img src='/images/delete.png' alt='Delete-button' /></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Detailtodo;