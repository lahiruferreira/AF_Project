import React, {Component} from "react";
import {connect} from "react-redux";
import {loginUser, logOut} from "../action/auth";
import { Redirect } from "react-router-dom";
import LogedinHeader from "./LogedInHeader";
import logo from '../Images/logo.jpg';
import '../CSS/CartView.css';
import axios from 'axios';


 export default class CartView extends Component{

    constructor(props) {
        super(props);
         this.state = {
             products: [] ,
             user:loginUser
         };
        this.productList = this.productList.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4001/cart/')
            .then(response => {
                this.setState({products :response.data})
                console.log(this.state.products);
            })
            .catch(error => {
                console.log(error);
            })
    }

    productList(){
        return this.state.products.map(product =>(
            <div className="col-sm-6 col-md-4 mb-3">
                <div className="img-thumbnail">
                    <img src={logo} className="img-responsive" alt="logo"/>
                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <p>{product.PDescription}</p>
                        <div className="clearfix">
                            <div className="pull-left" style={{fontWeight:"bold" ,fontSize:"16px"}}>Rs {product.PPrice}</div>
                            <p className="pull-right"><a href="#" className="btn btn-success" role="button">Add To Cart</a>
                                <a href={'/add-to-cart/'+ product._id} className="btn btn-info" role="button">Wish List</a></p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }


    render() {

        return(
            <div>
                <LogedinHeader/>
                    <div className="container">
                        <div className="row">
                            {this.productList()}
                        </div>
                    </div>
            </div>
        );
    }

}