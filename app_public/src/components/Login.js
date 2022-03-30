import React from "react";
import Loginbox from './Loginbox/Loginbox';
import Header from './Header/Header';
import Footer from "./Footer/Footer";

const Login = () => {
    return (
        <><Header />
            <div className="home-wrap">
                <div className='atf-wrap'>
                    <div className='grid'>
                        <div className="login-wrap">
                            <Loginbox />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;