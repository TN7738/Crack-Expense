import React, { useState } from 'react';
import './groupdetails.scss';
import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Groupdetails = () => {
    let { id } = useParams();
    const [grpDetails, setGrpDetails] = useState([]);
    
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/group/"+id)
            .then(res => {
                setGrpDetails(res.data);
                let grpMemNames = [];
                grpDetails.groupMembers.forEach(elem => {
                    axios.get("http://localhost:3000/api/user/"+id)
                        .then(res => {
                            grpMemNames.push(res.firstName + " " + res.lastName);
                            console.log(res.firstName + " " + res.lastName);
                        });
                });
                setGrpDetails((grpDetails) => [...grpDetails, grpMemNames]);
            })
            .catch(err => {
                setGrpDetails(null);
            });
    }, []);

    console.log(grpDetails);

    return (
        <div className='grp-dtls-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    {
                        
                    }
                </div>
            </div>
        </div>
    );
};
    
export default Groupdetails;