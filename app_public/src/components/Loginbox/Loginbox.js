import React from 'react';
import './loginbox.scss';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Loginbox extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
        
    }
    

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        axios.get('http://localhost:3000/api/user')
            .then(res => {
                let foundFlag = false;
                res.data.forEach(elem => {
                    if(elem.email == userData.email && elem.password == userData.password){
                        foundFlag = true;
                        return;
                    }
                });
                if(foundFlag){
                    const cookies = new Cookies();
                    cookies.set('user', userData);
                    console.log(cookies.get('user'));
                }
            });
    }
    render() {
        return (
            <div className='loginbox-wrap'>
                <div className='container'>
                    <div className='logo-wrap'>
                        <img src="images/logo.png" alt="Logo" />
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <input type="email" className="emailid" name="email" placeholder='Email' value={this.state.email} onChange={this.onChangeEmail} required />
                        <input type="password" className="password" name="password" placeholder='Password' value={this.state.password} onChange={this.onChangePassword} required />
                        <a className="signup-link" href="/signup">Not a member?</a>
                        <input type="submit" className="login-btn" value="Login"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default Loginbox;