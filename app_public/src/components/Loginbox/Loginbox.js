import React, {useState} from 'react';
import './loginbox.scss';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Loginbox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        let userData = {
            email: email,
            password: password
        };

        axios.get('http://localhost:3000/api/user')
            .then(res => {
                let foundFlag = false;
                res.data.forEach(elem => {
                    if(elem.email == userData.email && elem.password == userData.password){
                        foundFlag = true;
                        userData = {...userData, firstName: elem.firstName, lastName: elem.lastName};
                        return;
                    }
                });
                if(foundFlag){
                    const cookies = new Cookies();
                    cookies.set('user', userData);
                    console.log(cookies.get('user'));
                }
            });
    };
    return (
        <div className='loginbox-wrap'>
            <div className='container'>
                <div className='logo-wrap'>
                    <img src="images/logo.png" alt="Logo" />
                </div>
                <form onSubmit={e => {onSubmit(e)}}>
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