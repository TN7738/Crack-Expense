import React from "react";
import Signupbox from './Signupbox/Signupbox';
import Header from './Header/Header';
import Footer from "./Footer/Footer";


const Signup = () => {
    return (
        <><Header />
        <div className="home-wrap">
            <div className='atf-wrap'>
                <div className='grid'>
        <div className="signupbox-wrap">
            <Signupbox />
        </div>
        </div>
        </div>
        </div>
        <Footer />
        </>
    );
};

export default Signup;