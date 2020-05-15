import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Products</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">All Products</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/category" className="nav-link">Create Categories</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/product" className="nav-link">Create Products</Link>
                        </li>
                    </ul>
                </div>
            </nav>




        );
    }
}
