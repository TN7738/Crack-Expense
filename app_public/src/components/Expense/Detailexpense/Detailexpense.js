import React, { useState } from 'react';
import './detailexpense.scss';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';
import Cookies from 'universal-cookie';

const Detailexpense = () => {
    let history = useHistory();
    const cookies = new Cookies();
    let uid;
    if (document.cookie.indexOf('user') === -1) {
        history.push("/login");
    }
    else {
        uid = cookies.get('user')['_id'];
    }
    let { id } = useParams();
    const [expnsData, setExpnsData] = useState([]);
    const [name, setName] = useState("");
    const [paidby, setPaidby] = useState([]);
    const [paidbyName, setPaidbyName] = useState("");
    const [amount, setAmount] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/expense/" + id)
            .then(res => {
                setExpnsData(res.data);
                setName(res.data.name);
                setAmount(res.data.amount);
                setPaidby(res.data.paidby);
                return (
                    res.data.gmembers.forEach(elem => {
                        axios.get("http://localhost:3000/api/user/" + elem)
                            .then(res => {
                                setAddedUsers((addedUsers) => [...addedUsers, res.data]);
                            })
                    })
                );
            });
    }, []);

    React.useEffect(() => {
        axios.get("http://localhost:3000/api/user/" + paidby)
            .then(res => {
                setPaidbyName(res.data.firstName + " " + res.data.lastName);
            });
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (addedUsers.length >= 1) {
            let tmpUsrs = [];
            addedUsers.forEach(user => {
                tmpUsrs.push(user._id);
            });
            const expData = {
                gid: expnsData.gid,
                name: name,
                date: new Date(),
                paidby: paidby,
                gmembers: tmpUsrs,
                amount: amount
            };
            const res = axios.put("http://localhost:3000/api/expense" + id, expData);
            console.log(res);
            // history.push("/group/"+expnsData.gid);
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

    const deleteExp = () => {
        axios.delete("http://localhost:3000/api/expense/" + id)
            .then(res => {
                history.push("/group/" + expnsData.gid);
            })
    }
    return (
        <div className='dtl-exp-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <h4>{name}</h4>
                    <div className='inner-wrap'>
                        <a className='dlt' onClick={e => { deleteExp() }}><img src='/images/delete.png' alt='Delete-button' /></a>
                        <form onSubmit={e => { onSubmit(e) }}>
                            <input type="text" className="name" name="name" placeholder='Expense Name' value={name} onChange={e => setName(e.target.value)} required />
                            <input type="number" className="amount" name="amount" placeholder='Total' value={amount} onChange={e => setAmount(e.target.value)} required />
                            <div className='paid-by'>
                                <span className='ttl'>Paid by:</span> <span className='prsn'>{paidbyName === "undefined undefined" ? '' : paidbyName}</span>
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
                                            return (
                                                <li key={elem._id}>
                                                    <span onClick={() => { addUserToGroup(elem) }}>{elem.firstName} {elem.lastName}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <input type="submit" className="create-btn" value="Update"></input>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Detailexpense;