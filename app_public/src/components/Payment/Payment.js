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
    let { todoid } = useParams();
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
                                if(!todoid){
                                    history.push("/todo/"+id);
                                }
                                else{
                                    history.push("/detail-todo/"+todoid);
                                }
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
                    <div className='inner-wrap'>
                        <div className='left-wrap'>
                            <h4>Let's get you going with the To-Do list</h4>
                            <p>Create, update and share your To-Do list with your friends and family. All the members in your group can access your list.</p>
                            <StripeCheckout
                                stripeKey="pk_test_51Kj8lxHcluK5qSq9gZypTTFEc56GG0TlvZWcI6VGkgThSp55MRkXfUMaNaZ2ZlO4d7xrf3PumIAry9MLSiSPNwCl005xTqZcWD"
                                token={handleToken}
                                amount={details.amount * 100}>
                                    <button className='btn'>Go Premium</button>
                            </StripeCheckout>
                        </div>
                        <div className='right-wrap'>
                            <img className='img1' src='/images/todo1-pay.jpg' alt='Todo-promo-image1' />
                            <img className='img2' src='/images/todo2-pay.jpg' alt='Todo-promo-image2' />
                        </div>
                    </div>
                    <p className='disc'><span>Disclaimer:</span><br />This website do-not sell any product or subscription. The payment gateway is purely for educational and demonstration purposes only. If you are a visitor to website, please do-not proceed to pay. Owners of this website will not be liable for any kind of transaction.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;