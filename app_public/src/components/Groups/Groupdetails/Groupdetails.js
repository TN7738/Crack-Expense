import React, { useState } from 'react';
import './groupdetails.scss';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Groupdetails = () => {
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
                                //setGrpMbrNames(res.data.firstName + " " + res.data.lastName);
                                setGrpMbrNames((grpMbrNames) => [...grpMbrNames, res.data.firstName + " " + res.data.lastName]);
                            })
                    })
                );
            })
    }, []);

    // console.log(grpMbrNames)

    return (
        <div className='grp-dtls-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <h4>{grpDetails}</h4>
                    <ul>
                        {
                            grpMbrNames.map((membr, index) => <li key={`member${index}`}>{membr}</li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};
    
export default Groupdetails;