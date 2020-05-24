import React, {useEffect, useState} from 'react'
import axios from 'axios';
import LogedinHeader from "./LogedInHeader";
import {useDispatch} from "react-redux";
import {addToCart} from "../action/auth";

function LandingPage(){
    const dispatch = useDispatch();
    const [Products,setProduct] = useState([])

    const addToCarthandler = (productID) =>{
        console.log(productID);
        dispatch(addToCart(productID))
    }

    const addToWishList = (productID) =>{
        console.log(productID);
    }


    const productList = Products.map((product,index)=> {
        return <div className="col-sm-6 col-md-4 mb-3" key={index}>
                <div className="img-thumbnail">
                    <img src={product.PImage} className="img-responsive" alt="logo"/>
                    <div className="figure-caption ml-3">
                        <h3>{product.PName}</h3>
                        <p>{product.PDescription}</p>
                        <div className="clearfix">
                            <div className="pull-left" style={{fontWeight:"bold" ,fontSize:"16px"}}>Rs {product.PPrice}</div>
                            <p className="pull-right"><a onClick={() => addToCarthandler(product._id)} className="btn btn-success" role="button">Add To Cart</a>
                                <a onClick={() => addToWishList(product._id)} className="btn btn-info" role="button">Wish List</a></p>
                        </div>
                    </div>
                </div>
            </div>
    })

    useEffect(() => {
        axios.get('http://localhost:4001/cart/')
            .then(response => {
                    setProduct(response.data)
                    console.log(response.data)
            })
    },[])

    return(
        <div>
            <LogedinHeader/>
            <div className="container">
                <div className="row">
                    {productList}
                </div>
            </div>
        </div>
    )

}
export default LandingPage