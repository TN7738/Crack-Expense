import React, { useState } from 'react';
import './createtodo.scss';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Createtodo = () => {
    let history = useHistory();
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    let { id } = useParams();
    const [name, setName] = useState("");
    const [inputFields, setInputFields] = useState([
        {todolist: '', status: false}
    ]);

    const setTodoList = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const addFields = () => {
        let newfield = { todolist: '', status: false };
        setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const todoData = {
            name: name,
            gid: id,
            list: inputFields
        }
        axios.post(`/api/todo`, todoData)
            .then(res => {
                history.push("/group/" + id);
            });
    };
    return (
        <div className='crt-todo-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <h4>Create a To-Do</h4>
                    <div className='inner-wrap'>
                        <form onSubmit={e => { onSubmit(e) }}>
                            <input type="text" className="name" name="name" placeholder='List title' value={name} onChange={e => setName(e.target.value)} required />
                            <div className='list-wrap'>
                                {
                                    inputFields.map((input, index) => {
                                        return (
                                            <div key={index} className='list-inner-wrap'>
                                                <input type="text" name='todolist' placeholder={'To-Do' + (index + 1)} value={input.todolist} onChange={e => setTodoList(index, e)} required />
                                                <a onClick={e => removeFields(index)} className={index === 0 ? 'no-show' : 'show'}><img src={index === 0 ? '/images/remove3.png' : '/images/remove2.png'} alt='Remove-button' /></a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='add-wrap'>
                                <a onClick={e => addFields()} className='ad-btn'><img src='/images/add2.png' alt='Add-button' /></a>
                            </div>
                            <input type="submit" className="create-btn" value="Create"></input>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Createtodo;