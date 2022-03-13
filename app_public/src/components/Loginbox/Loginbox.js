import React from 'react';
import './loginbox.scss';
import axios from 'axios';

class Loginbox extends React.Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        axios.get('http://localhost:3000/api/user')
            .then(res => {
                const foundEmail = res.data.some(el => el.email === userData.email);
                const foundPassword = res.data.some(el => el.password === userData.password);
                if(foundEmail && foundPassword){
                    console.log("Logged in");
                }
            });
    }
    render(){
        return (
            <div className='loginbox-wrap'>
                <div className='container'>
                    <div className='logo-wrap'>
                        <img src="images/logo.png" alt="Logo" />
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <input type="email" className="emailid" name="email" placeholder='Email' value={this.state.email} onChange={this.onChangeEmail} required />
                        <input type="password" className="password" name="password" placeholder='Password' value={this.state.password} onChange={this.onChangePassword} required />
                        <input type="submit" className="login-btn" value="Login"></input>
                    </form>
                </div>
            </div>
        );
    }
}
    
export default Loginbox;