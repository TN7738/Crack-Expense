import React, { useState } from 'react';
import './createexpense.scss';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';
import Cookies from 'universal-cookie';

const Expense = () => {
    let history = useHistory();
    const cookies = new Cookies();
    let uid;
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    else{
        uid = cookies.get('user')['_id'];
    }
    let { id } = useParams();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [amount, setAmount] = useState("");
    const [currUser, setCurrUser] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/group/"+id)
            .then(res => {
                return(
                    res.data.groupMembers.forEach(elem => {
                        axios.get("http://localhost:3000/api/user/"+elem)
                            .then(res => {
                                uid === elem ? setCurrUser(res.data.firstName + " " + res.data.lastName) : setUsers((users) => [...users, res.data]);
                            })
                    })
                );
            })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if(addedUsers.length >= 1){
            const expData = {
                gid: id,
                name: name,
                date: new Date(),
                paidby: uid,
                gmembers: addedUsers,
                amount: amount,
                img: image.name
            };

            axios.post(`http://localhost:3000/api/expense`, expData)
                .then(res => {
                    history.push("/group/"+id);
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
                            <input type="file" name="expenseimage" className="expenseimage" onChange={e => setImage(e.target.files[0])} />
                            <div className='paid-by'>
                                <span className='ttl'>Paid by:</span> <span className='prsn'>{currUser}</span>
                            </div>
                            <div className='added-members'>
                                <ul>
                                    {
                                        addedUsers.length < 1 ? <li className='no-mbrs'>No members yet</li> : addedUsers.map(elem => <li className='member' key={elem._id}><span onClick={e => { removeUserFromGroup(elem) }}>{elem.firstName} {elem.lastName}</span></li>)
                                    }
                                </ul>
                            </div>
                            <div className='members-wrap'>
                                <ul>
                                    {
                                        users.map(elem => {
                                            return(
                                                <li key={elem._id}>
                                                    <span onClick={() => { addUserToGroup(elem) }}>{elem.firstName} {elem.lastName}</span>
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