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
import AdminPages from "./Pages/AdminPages";

if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}
const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    },[]);

    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/UserPages" component={UserPages}/>
                        <Route path="/admin" component={AdminPages}/>
                        <Route path="/" component={Dashboard}/>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}
export default App;
