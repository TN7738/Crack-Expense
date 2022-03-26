import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Homepage from "../components/Homepage";
import Groups from '../components/Groups/Groups';
import Creategroup from '../components/Groups/Creategroup/Creategroup';
import Groupdetails from '../components/Groups/Groupdetails/Groupdetails';
import Expense from '../components/Expense/Createexpense/Createexpense';

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
            <Route exact path="/group">
                <Groups />
            </Route>
            <Route exact path="/create-group">
                <Creategroup />
            </Route>
            <Route exact path="/group/:id">
                <Groupdetails />
            </Route>
            <Route exact path="/group/:id/addexpense">
                <Expense />
            </Route>
        </Router>
    );
};

export default MainRoutes;
