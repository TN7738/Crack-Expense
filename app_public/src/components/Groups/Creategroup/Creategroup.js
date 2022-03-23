import React, { useState } from 'react';
import './creategroup.scss';
import { useHistory } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';

const Creategroup = () => {
    let history = useHistory();
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    const [groupName, setGroupName] = useState("");
    const [users, setUsers] = useState([]);
    const [addedUsers, setAddedUsers] = useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/user")
            .then(res => {
                setUsers(res.data);
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

            axios.post(`http://localhost:3000/api/group`, grpData)
                .then(res => {
                    console.log("group created");
                });
        }
    };

    const removeUserFromGroup = (el) => {
        const _id = el._id;
        setAddedUsers(addedUsers.filter(item => item._id !== _id));
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
                                                    <span>{elem.firstName} {elem.lastName}</span> <a onClick={() => { setAddedUsers((addedUsers) => [...addedUsers, elem]) }}>+</a>
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