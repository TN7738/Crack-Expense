import React, { useState } from 'react';
import './payment.scss';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Cookies from 'universal-cookie';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";

const Payment = () => {
    const cookies = new Cookies();
    const history = useHistory();
    const [details, setDetails] = useState({
        amount: 1.49
    })
    let { id } = useParams();
    const handleToken = token => {
        const body = {
            token,
            details
        };
        axios.post(`/api/payment`, body)
            .then(res => {
                const {status} = res;
                if(status === 200){
                    let userData = (cookies.get('usrDtl'));
                    userData.premium = true;
                    cookies.set('usrDtl', userData, { path: '/' });
                    axios.put("/api/user/"+userData._id, userData)
                        .then(res => {
                            const {status} = res;
                            if(status === 200){
                                history.push("/todo/"+id);
                            }
                        })
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='payment-wrap'>
            <Header />
            <div className='atf-wrap'>
                <div className='grid'>
                    <div className='left-wrap'>
                        <h4>Lets get you going with the To-Do list</h4>
                        <p>Create, update and share your To-Do list with your friends or family. All the members in your group can access your list.</p>
                    </div>
                    <div className='right-wrap'>

                    </div>
                </div>
            </div>
            <StripeCheckout
                stripeKey="pk_test_51Kj8lxHcluK5qSq9gZypTTFEc56GG0TlvZWcI6VGkgThSp55MRkXfUMaNaZ2ZlO4d7xrf3PumIAry9MLSiSPNwCl005xTqZcWD"
                token={handleToken}
                amount={details.amount * 100}>
                    <button className='btn'>Go Premium</button>
            </StripeCheckout>
        </div>
    );
}

export default Payment;