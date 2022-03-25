import React, { useState } from 'react';
import './groups.scss';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import axios from 'axios';

const Groups = () => {
    let history = useHistory();
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    const [groups, setGroups] = useState(null);
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/group")
            .then(res => {
                setGroups(res.data);
            })
            .catch(err => {
                setGroups(null);
            });
    }, []);
    const toCreateGroup = () => {
        if(document.cookie.indexOf('user') !== -1){
            history.push("/group/create-group");
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
                                    groups == null ? <li className='nogrps'>You don't have any groups yet</li> : groups.map(elem => <li className='grp' key={elem._id}><a href={'/group/' + elem._id}>{elem.groupName}</a></li>)
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