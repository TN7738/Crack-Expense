import React, { useState } from 'react';
import './groups.scss';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import axios from 'axios';
import Cookies from 'universal-cookie';

const Groups = () => {
    const cookies = new Cookies();
    let history = useHistory();
    let _id;
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    else{
        _id = cookies.get('user')['_id'];
    }
    const [groups, setGroups] = useState(null);
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/group")
            .then(res => {
                let temp = [];
                res.data.forEach(curr => {
                    curr.groupMembers.forEach(elem => {
                        if(_id === elem){
                            temp.push(curr);
                            return;
                        }
                    });
                });
                setGroups(temp);
            })
            .catch(err => {
                setGroups(null);
            });
    }, []);
    const toCreateGroup = () => {
        if(document.cookie.indexOf('user') !== -1){
            history.push("/create-group");
        }
    };
    return (
        <div className='group-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <div className='inner-wrap'>
                        <div className='left-wrap'>
                            <h4>Your Groups</h4>
                            <ul>
                                {
                                    groups == null || groups.length === 0 ? <li className='nogrps'>You don't have any groups yet</li> : groups.map(elem => <li className='grp' key={elem._id}><a href={'/group/' + elem._id}>{elem.groupName}</a></li>)
                                }
                            </ul>
                        </div>
                        <div className='right-wrap'>
                            <a className='new-grp-btn' onClick={e => toCreateGroup()}>Create new Group</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Groups;