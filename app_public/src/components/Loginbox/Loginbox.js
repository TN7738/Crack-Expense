import React, { useState } from 'react';
import './loginbox.scss';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

const Loginbox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();

        let userData = {
            email: email,
            password: password
        };

        axios.get('/api/user')
            .then(res => {
                let foundFlag = false;
                res.data.forEach(elem => {
                    if (elem.email === userData.email && elem.password === userData.password) {
                        foundFlag = true;
                        userData = { ...userData, firstName: elem.firstName, lastName: elem.lastName, _id: elem._id, premium: elem.premium };
                        return;
                    }
                });
                if (foundFlag) {
                    const cookies = new Cookies();
                    cookies.set('usrDtl', userData);
                    history.push("/");
                }
            });
    };
    return (
        <div className='loginbox-wrap'>
            <div className='container'>
                <div className='logo-wrap'>
                    <img src="images/logo.png" alt="Logo" />
                </div>
                <form onSubmit={e => { onSubmit(e) }}>
                    <input type="email" className="emailid" name="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" className="password" name="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                    <a className="signup-link" href="/signup">Not a member?</a>
                    <input type="submit" className="login-btn" value="Login"></input>
                </form>
            </div>
        </div>
    );
}

export default Loginbox;