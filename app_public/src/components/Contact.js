import React from 'react'
import Address from './Contact/Contact'
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Contact = () => {
    return (
        <><Header />
            <div className='atf-wrap'>
                <Address />
                <Footer />
            </div>
        </>
    );
};

export default Contact;
