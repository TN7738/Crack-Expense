import React, { useState } from 'react';
import './creategroup.scss';
import { useHistory } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';
import Cookies from 'universal-cookie';

const Creategroup = () => {
    let history = useHistory();
    let uid;
    const cookies = new Cookies();
    if(document.cookie.indexOf('usrDtl') === -1){
        history.push("/login");
    }
    else{
        uid = cookies.get('usrDtl')['_id'];
    }
    const [groupName, setGroupName] = useState("");
    const [users, setUsers] = useState([]);
    const [addedUsers, setAddedUsers] = useState([]);
    React.useEffect(() => {
        axios.get("/api/user")
            .then(res => {
                res.data.forEach(elem => {
                    uid === elem._id ? setAddedUsers((addedUsers) => [...addedUsers, elem]) : setUsers((users) => [...users, elem]);
                });
            })
            .catch(err => {
                setUsers(null);
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if(addedUsers.length >= 2){
            const grpData = {
                groupName: groupName,
                groupMembers: addedUsers
            };

            axios.post(`/api/group`, grpData)
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
        <div className='create-grp-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <h4>Create Group</h4>
                    <div className='inner-wrap'>
                        <form onSubmit={e => { onSubmit(e) }}>
                            <input type="text" className="groupname" name="groupname" placeholder='Groupname' value={groupName} onChange={e => setGroupName(e.target.value)} required />
                            <div className='added-members'>
                                <ul>
                                    {
                                        addedUsers.length < 1 ? <li className='no-mbrs'>No members yet</li> : addedUsers.map(elem => <li className={'member ' + (uid === elem._id ? 'hide-btn' : 'show-btn')} key={elem._id}><span onClick={e => { removeUserFromGroup(elem) }}>{elem.firstName} {elem.lastName}</span></li>)
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
};

export default Creategroup;