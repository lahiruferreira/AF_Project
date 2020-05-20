import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

const Product = props =>(
    <tr>
        <td>{props.product.PImage}</td>
        <td>{props.product.PName}</td>
        <td>{props.product.PDescription}</td>
        <td>{props.product.PBrand}</td>
        <td>{props.product.PAmount}</td>
        <td>{props.product.PPrice}</td>
        <td>{props.product.updatedAt.slice(0,10)}</td>
        <td>
           <Link to={"/edit/"+props.product._id}><button className="btn-primary">Update</button></Link>  <button className="btn-danger" onClick={() => {props.deleteProduct(props.product._id)}}>Delete</button>
        </td>
    </tr>
);


export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state ={
            product :[]
        };
    }

    componentDidMount() {

        axios.get("http://localhost:4001/product/")
            .then(response => {
                this.setState({
                    product : response.data})
            })
            .catch((error)=>{
              console.log(error);
            })
    }

    deleteProduct(id){
        axios.delete("http://localhost:4001/product/"+id)
            .then(res=> console.log(res.data));
        this.setState({
            product: this.state.product.filter(el => el._id !== id)
        })
    }

    productList(){
        return this.state.product.map(currentproduct =>{
            return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>
        })
    }

    render() {
        return (
            <div>
                <h1>Products Table</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Brand</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.productList()}
                    </tbody>
                </table>
            </div>

        );
    }
}
