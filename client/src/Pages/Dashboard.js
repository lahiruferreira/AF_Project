import React from "react";
import {Link} from "react-router-dom";
import "../CSS/dashboard.css";


const Dashboard = () => {
    return (
        <div className="container">
            <div className="mainDashboard">
                <h1>Dashboard</h1>
            </div>
                <div className="content_dashboard1">
                    <Link to="/register">Register</Link>
                </div>

                <div className="content_dashboard2">
                    <Link to="/login">Login</Link>
                </div>
                <div className="content_dashboard3">
                    <Link to="/admin">Admin</Link>
                </div>
        </div>

    );
}


export default (Dashboard);