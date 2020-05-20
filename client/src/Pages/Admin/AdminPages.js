import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./navbar.component";
import ProductList from "./product-list.component";
import EditProduct from "./edit-product.component";
import CreateProduct from "./create-product.component";
import CreateCategory from "./create-category.component";
import AddSM from "./add-sm.component";
import Logout from "./AdminLogout";
import NewOrders from "./new-order.component";
import CusFeedback from "./Feedback";

function App() {
    return (
        <Router>
            <div className="">
                <Navbar />
                <br/>
                <div className="container">
                    <Route path="/list" exact component={ProductList}/>
                    <Route path="/edit/:id" component={EditProduct}/>
                    <Route path="/product" component={CreateProduct}/>
                    <Route path="/category" component={CreateCategory}/>
                    <Route path="/newOrders" component={NewOrders}/>
                    <Route path="/cusFeedback" component={CusFeedback}/>
                    <Route path="/addSM" component={AddSM}/>
                    <Route path="/logout" component={Logout}/>
                </div>
            </div>
        </Router>
    );
}

export default App;
