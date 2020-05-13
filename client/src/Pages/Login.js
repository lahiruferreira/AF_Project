import React, {useState} from "react";
import {loginUser} from "../action/auth";
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import '../CSS/login.css';


const Login = ({ loginUser, isLoggedIn }) => {

    let [data,setData] = useState({
        email:'',
        password:''
    });
    let {email, password} = data;
    if(email==='admin' && password==='123'){
        return <Redirect to="/admin"/>
    }
    else if(isLoggedIn) {
        return <Redirect to="/UserPages"/>
    }

    //first change from sachi
    const onChange = e => {
        setData({...data,[e.target.name]: e.target.value})
    };

    const submitData = () => {
        loginUser(email,password);
    };

    return (

        <div className="container">

            <div className="whole-page">
                <div className="parent-heading col-md-auto">
                    <div className="heading1">
                        <p>LOGIN</p>
                    </div>
                </div>

                <div className="login_form ">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                               className="form-control"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               onChange={(e) => onChange(e)}
                               value={email}
                               name="email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                               className="form-control"
                               id="exampleInputPassword1"
                               onChange={(e) => onChange(e)}
                               value={password}
                               name="password"/>
                    </div>
                   
                        <a href="/register">Register</a>

                    <button type="submit"
                            className="btn btn-primary"
                            onClick={() => submitData()}>Submit
                    </button>


                    <br/>
                    <br/>
                </div>
            </div>

        </div>

    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps,{ loginUser })(Login);