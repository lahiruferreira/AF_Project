import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./navbar.component";
import ProductList from "./product-list.component";
import EditProduct from "./edit-product.component";
import CreateProduct from "./create-product.component";
import CreateCategory from "./create-category.component";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <br/>
                <Route path="/" exact component={ProductList}/>
                <Route path="/edit/:id" component={EditProduct}/>
                <Route path="/product" component={CreateProduct}/>
                <Route path="/category" component={CreateCategory}/>
            </div>
        </Router>
    );
}

export default App;
