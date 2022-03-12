import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";

function MainRoutes() {
    return (
        <Router>

            <Route path="/">
                <Login />
            </Route>
            <Route path="/Signup">
                <Signup />
            </Route>

        </Router>
    )
}

export default MainRoutes
