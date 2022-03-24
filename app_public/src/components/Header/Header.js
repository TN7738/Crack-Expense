import React from 'react';
import './header.scss';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

const header = () => {
    const cookies = new Cookies();
    toast.configure();
    const notify = (msg) => {
        toast(msg);
    };

    let firstName;
    if(document.cookie.indexOf('user') != -1){
        firstName = cookies.get('user')['firstName'];
    }

    const logout = () => {
        cookies.remove('user');
        notify("Logged out successfully");        
    }

    const UlContent = props => {
        if(firstName == undefined){
            return <ul><li><a href="Login">Login</a></li><li><a href="Signup">Signup</a></li></ul>
        }
        else{
            return <ul><li>Hi, {firstName}</li><li><a href="/" onClick={logout}>Logout</a></li></ul>
        }
    }
    return (
        <header>
            <div className='grid'>
                <nav>
                    <img src='/images/logo.png' alt='Logo' />
                    <UlContent />
                </nav>
            </div>
        </header>
    );
};
    
export default header;