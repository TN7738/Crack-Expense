import React from 'react';
import './header.scss';

const header = () => {
    return (
        <div className='header-wrap'>
            <nav>
                <img src='images/logo.png' alt='Logo' />
                <ul>
                    <li>
                        <a href="Login">
                            Login
                        </a>
                    </li>
                    <li>
                        <a href="Signup">
                            Signup
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
    
export default header;