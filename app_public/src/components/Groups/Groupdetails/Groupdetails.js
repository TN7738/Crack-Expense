import React, { useState } from 'react';
import './groupdetails.scss';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import Listingexpense from '../../Expense/Listingexpense/Listingexpense';
import Listingtodo from '../../Todo/Listingtodo/Listingtodo';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Groupdetails = () => {
    const cookies = new Cookies();
    let isPremium;
    let history = useHistory();
    if(document.cookie.indexOf('usrDtl') === -1){
        history.push("/login");
    }
    else{
        isPremium = cookies.get('usrDtl').premium;
    }
    let { id } = useParams();
    const [grpDetails, setGrpDetails] = useState([]);
    const [grpMbrNames, setGrpMbrNames] = useState([]);
    
    React.useEffect(() => {
        axios.get("/api/group/"+id)
            .then(res => {
                setGrpDetails(res.data.groupName);
                return(
                    res.data.groupMembers.forEach(elem => {
                        axios.get("/api/user/"+elem)
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
                    <div className='grpdetail-wrap'>
                            <h4>{grpDetails}</h4>
                            <ul>
                                {
                                    grpMbrNames.map((membr, index) => <li key={`member${index}`}>{membr}</li>)
                                }
                            </ul>
                        </div>
                        <div className='inner-wrap'>
                            <div className='exp-wrap'>
                                <div className='left-wrap'>
                                    <Listingexpense groupid = {id} />
                                </div>
                                <div className='right-wrap'>
                                    <a className='add-exp' href={'/group/' + id + '/addexpense'}>Add Expense</a>
                                </div>
                            </div>
                            <div className='td-wrap'>
                                <div className='left-wrap'>
                                    <Listingtodo groupid = {id} />
                                </div>
                                <div className='right-wrap'>
                                    <a className='add-todo' href={isPremium ? '/todo/' + id : '/payment/' + id}>Add To-Do<img src='/images/premium.png' alt='premium-badge' /></a>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
           <Footer />
        </div>

    );
};
    
export default Groupdetails;