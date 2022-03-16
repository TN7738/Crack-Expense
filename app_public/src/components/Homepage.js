import React from "react";
import Homepage from './Homepage/Homepage';
import Header from './Header/Header';
import Footer from "./Footer/Footer";

const Home = () => {
    return (
        <div className="home-wrap">
            <Header />
            <Homepage />
        </div>
    );
};

export default Home;