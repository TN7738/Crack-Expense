import React from "react";
import Signupbox from './Signupbox/Signupbox';
import Header from './Header/Header';
import Footer from "./Footer/Footer";


const Signup = () => {
    return (
        <div className="sngup-afterwrap">
            <Header />
            <div className="sngup-wrap">
                <div className='atf-wrap'>
                    <div className='grid'>
                        <Signupbox />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;