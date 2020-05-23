import React from "react";
import '../CSS/header.css';
import logo from '../Images/logo.jpg';


const Header = () => {
    return (
        <div className="container-parent2">

                <div className="container-child">
                    <img src={logo}
                        alt="logo"/>
                </div>

            <div className="nav-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Titans Online Fashion Store</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">

                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Category
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/">Trousers</a>
                                    <a className="dropdown-item" href="/">T-Shirt</a>
                                    <a className="dropdown-item" href="/">Shorts</a>
                                    <a className="dropdown-item" href="/">Shoes</a>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item" href="/">Cosmetics</a>
                                    <a className="dropdown-item" href="/">Blouses</a>
                                    <a className="dropdown-item" href="/">Frocks</a>
                                    <a className="dropdown-item" href="/">Skirts</a>
                                    <a className="dropdown-item" href="/">Trouser-Female</a>
                                    <a className="dropdown-item" href="/">Shoes</a>
                                </div>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" href="/feedback">Feedback</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/contact-us">Contact-us <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/admin">Admin <span className="sr-only">(current)</span></a>
                            </li>


                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                <a href="/login">Login User</a>
                            </button>

                        </form>
                    </div>
                </nav>
            </div>
        </div>
    );
}


export default (Header);