import React, { useState } from 'react';
import './groupdetails.scss';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import Listingexpense from '../../Expense/Listingexpense/Listingexpense';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Groupdetails = () => {
    let history = useHistory();
    if(document.cookie.indexOf('user') === -1){
        history.push("/login");
    }
    let { id } = useParams();
    const [grpDetails, setGrpDetails] = useState([]);
    const [grpMbrNames, setGrpMbrNames] = useState([]);
    
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/group/"+id)
            .then(res => {
                setGrpDetails(res.data.groupName);
                return(
                    res.data.groupMembers.forEach(elem => {
                        axios.get("http://localhost:3000/api/user/"+elem)
                            .then(res => {
                                setGrpMbrNames((grpMbrNames) => [...grpMbrNames, res.data.firstName + " " + res.data.lastName]);
                            })
                    })
                );
            })
    }, []);

    return (
        <div className='grp-dtls-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <div className='inner-wrap'>
                        <div className='left-wrap'>
                            <h4>{grpDetails}</h4>
                            <ul>
                                {
                                    grpMbrNames.map((membr, index) => <li key={`member${index}`}>{membr}</li>)
                                }
                            </ul>
                        </div>
                        <div className='middle-wrap'>
                            <Listingexpense groupid = {id} />
                        </div>
                        <div className='right-wrap'>
                            <a className='add-exp' href={'/group/' + id + '/addexpense'}>Add Expense</a>
                            <a className='add-todo' href={'/todo/' + id}>Add To-Do<img src='/images/premium.png' alt='premium-badge' /></a>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>

    );
};
    
export default Groupdetails;