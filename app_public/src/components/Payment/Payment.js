import React, { useState } from 'react';
import './payment.scss';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
    
    const [details, setDetails] = useState({
        amount: 1.49
    })

    const handleToken = token => {
        // console.log({token});
        const body = {
            token,
            details
        }
        const headers = {
            "Content-Type": "application/json"
        };
        // axios.post(`http://localhost:3000/api/payment`, token)
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => console.log(err));
        return fetch(`/api/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(res => {
                console.log(res);
                const {status} = res;
                console.log(status);
            })
        .catch(err => console.log(err));
    };

    return (
        <div className='payment-wrap'>
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