import React, { useState } from 'react';
import './expense.scss';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import axios from 'axios';

const Expense = () => {
    let history = useHistory();
    let userid;
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    let { id } = useParams();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/group/"+id)
            .then(res => {
                return(
                    res.data.groupMembers.forEach(elem => {
                        axios.get("http://localhost:3000/api/user/"+elem)
                            .then(res => {
                                setUsers((users) => [...users, res.data]);
                            })
                    })
                );
            })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if(addedUsers.length >= 2){
            const expData = {
                gid: id,
                name: name,
                date: new Date(),
                gmembers: addedUsers,
                amount: amount
            };

            axios.post(`http://localhost:3000/api/expense`, expData)
                .then(res => {
                    history.push("/group");
                });
        }
    };

    const removeUserFromGroup = (el) => {
        const _id = el._id;
        setAddedUsers(addedUsers.filter(item => item._id !== _id));
        setUsers((users) => [...users, el]);
    };

    const addUserToGroup = (el) => {
        setAddedUsers((addedUsers) => [...addedUsers, el]);
        const _id = el._id;
        setUsers(users.filter(item => item._id !== _id));
    };
    return (
        <div className='create-exp-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <h4>Add an expense</h4>
                    <div className='inner-wrap'>
                        <form onSubmit={e => { onSubmit(e) }}>
                            <input type="text" className="name" name="name" placeholder='Expense Name' value={name} onChange={e => setName(e.target.value)} required />
                            <input type="number" className="amount" name="amount" placeholder='Total' value={amount} onChange={e => setAmount(e.target.value)} required />
                            <div className='added-members'>
                                <ul>
                                    {
                                        addedUsers.length < 1 ? <li className='no-mbrs'>No members yet</li> : addedUsers.map(elem => <li className='member' key={elem._id}><span>{elem.firstName}, {elem.lastName}</span> <a onClick={e => { removeUserFromGroup(elem) }}>X</a></li>)
                                    }
                                </ul>
                            </div>
                            <div className='members-wrap'>
                                <ul>
                                    {
                                        users.map(elem => {
                                            return(
                                                <li key={elem._id}>
                                                    <span>{elem.firstName} {elem.lastName}</span> <a onClick={() => { addUserToGroup(elem) }}>+</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
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

export default Expense;