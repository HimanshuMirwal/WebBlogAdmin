import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminLogin from "./modules/AdminSection/AdminLogin/AdminLogin";
import Modal from "../src/modules/AdminSection/AdminDashboard/Modal";

export default class App extends React.Component {
    render() {
        return (
            <div>
                {}
                <Router>
                    <Route path="/" exact component={AdminLogin} />
                    <Route path="/edit:id" component={Modal} />
                </Router>
            </div>
        )
    }
}
