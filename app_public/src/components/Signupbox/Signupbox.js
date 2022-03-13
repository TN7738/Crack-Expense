import React from 'react';
import './signupbox.scss';

const Signupbox = () => {
    return (
        <div className='signupbox-wrap'>
            <div className='container'>
                <div className='logo-wrap'>
                    <img src="images/logo.png" alt="Logo" />
                </div>
                <div className="title">Create an Account</div>
                <input type="text" className="name" name="name" placeholder='Name' />
                <input type="text" className="emailid" name="emailid" placeholder='Email' />
                <input type="password" className="password" name="password" placeholder='Password' />
                <a className="signup-btn">Sign Up</a>
            </div>
        </div>
    );
};

export default Signupbox;