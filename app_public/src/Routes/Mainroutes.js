import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Homepage from "../components/Homepage";
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainRoutes() {
    return (
        <Router>
            <Route path="/login">
                <Login />
            </Route>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/footer">
                <Footer />
            </Route>

        </Router>
    );
};

export default MainRoutes;
