import React from "react";
import {Link} from "react-router-dom";
import "../CSS/dashboard.css";


const Dashboard = () => {
    return (
        <div className="container">
            <div className="mainDashboard">
                <h1>Dashboard</h1>
            </div>
            <div className="nav_btn">
                <div className="content_dashboard1">
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>

                <div className="content_dashboard2">
                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>
                </div>
                <div className="content_dashboard3">
                    <Link to="/admin">
                        <button>Admin</button>
                    </Link>
                </div>
            </div>
        </div>



    );
}


export default (Dashboard);