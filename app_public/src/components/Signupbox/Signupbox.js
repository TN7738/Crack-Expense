import React, { useState, useEffect } from 'react';
import './signupbox.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signupbox = (props) => {

    let history = useHistory();
    toast.configure();
    const [newuser, setnewuser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const notify = (msg) => {
        toast(msg);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setnewuser(previousState => {
            return { ...previousState, [name]: value };
        });
    }

    // const clearstate = () => {
    //     setnewuser({...initalState});
    // };

    const createuser = (e) => {
        e.preventDefault();
        const userData = {
            firstName: newuser.firstName,
            lastName: newuser.lastName,
            email: newuser.email,
            password: newuser.password
        };

        axios.get('http://localhost:3000/api/user')
            .then(res => {
                const foundEmail = res.data.some(el => el.email === userData.email);
                if (foundEmail) {
                    notify('Email Already exist');
                    newuser.email = '';
                }
                else {
                    axios.post('http://localhost:3000/api/user', userData)
                        .then(
                            res => {
                                history.push("/login");
                                notify('Register Successfully');
                            }
                        );
                }
            })
            .catch(err => {
                if(err.response.status === 404){
                    axios.post('http://localhost:3000/api/user', userData)
                        .then(
                            res => {
                                history.push("/login");
                                notify('Register Successfully');
                            }
                        );
                }
            });
    };

    return (
        <div className='signupbox-wrap'>
            <div className='container'>
                <div className='logo-wrap'>
                    <img src="images/logo.png" alt="Logo" />
                </div>
                <form onSubmit={createuser}>
                    <div className="title">Create an Account</div>
                    <input type="text" value={newuser.firstName} className="name" name="firstName" placeholder='First Name' onChange={handleChange} required />
                    <input type="text" value={newuser.lastName} className="name" name="lastName" placeholder='Last Name' onChange={handleChange} required />
                    <input type="text" value={newuser.email} className="emailid" name="email" id="email" placeholder='Email' onChange={handleChange} required />
                    <input type="password" value={newuser.password} className="password" name="password" placeholder='Password' onChange={handleChange} required />
                    <a className="Login-link" href="/login">Already a member?</a>
                    <input type="submit" className="signup-btn" value="Signup"></input>
                </form>
            </div>
        </div>
    );
};

export default Signupbox;