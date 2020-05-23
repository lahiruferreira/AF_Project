import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import Register from './Pages/Register';
import store from "./store";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {loadUser} from "./action/auth";
import {setToken} from "./setToken";
import UserPages from "./Pages/UserPages";
import AdminPages from "./Pages/Admin/AdminPages";
//import Header from "./Pages/Header";
import Feedback from "./Pages/Feedback";
import ContactUs from "./Pages/ContactUs";
import CartView from "./Pages/CartView";
//import SMLogin from "./Pages/Admin/SMLogin";
//import SMPage from "./Pages/Admin/SMPage";


if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}
const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    },[]);

    return (
        <div className="page-container">
            <div className="content-wrap">

            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/register" component={Register}/>

                        <Route path="/UserPages" component={UserPages}/>
                        <Route path="/admin" component={AdminPages}/>
                        <Route path="/feedback" component={Feedback}/>
                        <Route path="/contact-us" component={ContactUs}/>
                        <Route path="/CartView" component={CartView}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={Dashboard}/>
                    </Switch>
                </Router>
            </Provider>
            </div>

        </div>
    );
}
export default App;
