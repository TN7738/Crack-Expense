import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Homepage from "../components/Homepage/Homepage";

function MainRoutes() {
    return (
        <Router>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/homepage">
                <Homepage />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
        </Router>
    );
}

export default MainRoutes
