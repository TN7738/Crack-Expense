import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Homepage from "../components/Homepage";
import Groups from '../components/Groups/Groups';
import Creategroup from '../components/Groups/Creategroup/Creategroup';
import Groupdetails from '../components/Groups/Groupdetails/Groupdetails';
import Expense from '../components/Expense/Createexpense/Createexpense';
import Detailexpense from '../components/Expense/Detailexpense/Detailexpense';
import Contact from '../components/Contact';
import About from '../components/About/About';
import Createtodo from '../components/Todo/Createtodo/Createtodo';
import Detailtodo from '../components/Todo/Detailtodo/Detailtodo';
import Payment from '../components/Payment/Payment';

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
            <Route exact path="/expense/:id">
                <Detailexpense />
            </Route>
            <Route exact path="/contact">
                <Contact />
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
            <Route exact path="/todo/:id">
                <Createtodo />
            </Route>
            <Route exact path="/detail-todo/:id">
                <Detailtodo />
            </Route>
            <Route exact path="/payment/:id">
                <Payment />
            </Route>
        </Router>
    );
};

export default MainRoutes;
