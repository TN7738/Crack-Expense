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
    if (document.cookie.indexOf('user') !== -1) {
        firstName = cookies.get('user')['firstName'];
    }

    const logout = () => {
        cookies.remove('user');
        notify("Logged out successfully");
    }

    const UlContent = props => {
        if (firstName === undefined) {
            return(
                <ul>
                    <li>
                        <a href="/login" className='btn'>Login</a>
                    </li>
                    <li>
                        <a href="/signup" className='btn'>Signup</a>
                    </li>
                </ul>
            )
        }
        else {
            return <ul><li className='usr-name'>Hi, {firstName}</li><li><a className='btn' href='/group'>Groups</a></li><li><a className='logout-btn' href="/" onClick={logout}><img src='/images/logout.png' alt='Logout-Button' /></a></li></ul>
        }
    }
    return (
        <header>
            <div className='grid'>
                <nav>
                    <a href='/' className='home-btn'>
                        <img src='/images/logo.png' alt='Logo' />
                    </a>
                    <UlContent />
                </nav>
            </div>
        </header>
    );
};

export default header;