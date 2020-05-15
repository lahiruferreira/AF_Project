import React, {Component} from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {
    constructor(props) {
        super(props);

        this.onChangePName = this.onChangePName.bind(this);
        this.onChangePDescription = this.onChangePDescription.bind(this);
        this.onChangePCategory = this.onChangePCategory.bind(this);
        this.onChangePBrand = this.onChangePBrand.bind(this);
        this.onChangePAmount = this.onChangePAmount.bind(this);
        this.onChangePPrice = this.onChangePPrice.bind(this);
        this.onChangePImage = this.onChangePImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            PName : "",
            PDescription : "",
            PCategory : "",
            PBrand : "",
            PAmount : 0,
            PPrice : 0,
            PImage : "",
            Category : []
        }
    }

    componentDidMount() {

        axios.get("http://localhost:4001/category/")
            .then(response => {
                if (response.data.length >0){
                    this.setState({
                        Category: response.data.map(category => category.cname),
                        PCategory: response.data[0].cname
                    });
                }
            })


    }

    onChangePName(e){
        this.setState({
            PName: e.target.value
        });
    }

    onChangePDescription(e){
        this.setState({
            PDescription: e.target.value
        });
    }

    onChangePCategory(e){
        this.setState({
            PCategory: e.target.value
        });
    }

    onChangePBrand(e){
        this.setState({
            PBrand: e.target.value
        });
    }

    onChangePAmount(e){
        this.setState({
            PAmount: e.target.value
        });
    }

    onChangePPrice(e){
        this.setState({
            PPrice: e.target.value
        });
    }

    onChangePImage(e){
        this.setState({
            PImage: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const product = {
            PName : this.state.PName,
            PDescription : this.state.PDescription,
            PCategory : this.state.PCategory,
            PBrand : this.state.PBrand,
            PAmount : this.state.PAmount,
            PPrice : this.state.PPrice,
            PImage : this.state.PImage
        }

        console.log(product);

        axios.post("http://localhost:4001/product/add", product)
            .then(res => console.log(res.data));

    }

    render() {
        return (
            <div>
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Category: </label>
                        <select ref="userInput"
                            required
                                className="form-control"
                                value={this.state.PCategory}
                                onChange={this.onChangePCategory}>
                            {
                                this.state.Category.map(function (category) {
                                    return <option
                                    key={category}
                                    value={category}>{category}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Product Name: </label>
                        <input type="text" required className="form-control"
                                value={this.state.PName}
                                onChange={this.onChangePName}/>
                    </div>

                    <div className="form-group">
                        <label>Product Description: </label>
                        <input type="text" required className="form-control"
                               value={this.state.PDescription}
                               onChange={this.onChangePDescription}/>
                    </div>

                    <div className="form-group">
                        <label>Product Brand: </label>
                        <input type="text" required className="form-control"
                               value={this.state.PBrand}
                               onChange={this.onChangePBrand}/>
                    </div>

                    <div className="form-group">
                        <label>Product Amount: </label>
                        <input type="text" required className="form-control"
                               value={this.state.PAmount}
                               onChange={this.onChangePAmount}/>
                    </div>

                    <div className="form-group">
                        <label>Product Price: </label>
                        <input type="text" required className="form-control"
                               value={this.state.PPrice}
                               onChange={this.onChangePPrice}/>
                    </div>

                    <div className="form-group">
                        <label>Product Image: </label>
                        <input type="file" required className="form-control"
                               value={this.state.PImage}
                               onChange={this.onChangePImage}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Product" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        );
    }
}