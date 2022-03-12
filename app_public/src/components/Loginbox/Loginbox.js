import React from 'react';
import './loginbox.scss';
// import './Signup.js';

const Loginbox = () => {
    return (
        <div className='loginbox-wrap'>
            <div className='container'>
                <div className='logo-wrap'>
                    <img src="images/logo.png" alt="Logo" />
                </div>
                <input type="text" className="emailid" name="emailid" placeholder='Email' />
                <input type="password" className="password" name="password" placeholder='Password' />
                <a className="signup-link" href="Signup">Not a member?</a>
                <a className="login-btn">Log in</a>
            </div>
        </div>
    );
};

export default Loginbox;