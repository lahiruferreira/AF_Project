import React, {useState} from "react";
import {loadUser, loadUser1, loginUser} from "../action/auth";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import '../CSS/login.css';
import Header from "./Header";
//import Register from "./Register";


const Login = ({loginUser, isLoggedIn}) => {

    let [data, setData] = useState({
        email: '',
        password: ''
    });

    let [user, setUser] = useState({
        position: ''
    })

    // let {position} = user;

    let {email, password} = data;


    if (isLoggedIn) {

        loadUser1().then((res) => {


            setUser({
                position: res.data.position
            })

        });



        console.log(user.position);

        switch (user.position) {
            case 'admin':
                //alert("Admin Logged In Success");
                return <Redirect to="/admin"/>
            case 'sm':
                //alert("Store Manager Logged In Success");
                return <Redirect to="/admin"/>
            case 'user':
                //alert("User Logged In Success");
                return <Redirect to="/CartView"/>
        }

    }


    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const submitData = () => {
        if( email === '' || password ==='') {
            return alert("Email and Password are required");
        }else {
            loginUser(email, password);
        }

    };


    return (
        <div>
            <Header/>
            <div className="container">

                <div className="whole-page">
                    <div className="parent-heading-1 col-md-auto">
                        <div className="heading1">
                            <p>LOGIN</p>
                        </div>
                    </div>

                    <div className="login_form ">
                        <div className="form-group-1">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   onChange={(e) => onChange(e)}
                                   value={email}
                                   name="email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone
                                else.</small>
                        </div>
                        <div className="form-group-1">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   onChange={(e) => onChange(e)}
                                   value={password}
                                   name="password"/>
                        </div>

                        <div className="login-btns">
                        <button type="button" className="btn btn-info">
                        <a className="register-anchor" href="/register">Register</a>
                        </button>

                        <button type="submit"
                                className="btn btn-primary"
                                onClick={() => submitData()}>Submit
                        </button>

                        </div>
                        <br/>
                        <br/>
                    </div>
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {loginUser})(Login);