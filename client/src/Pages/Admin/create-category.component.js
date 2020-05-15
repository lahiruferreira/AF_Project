import React, {Component} from 'react';
import axios from "axios";
import "./nav.css";

export default class CreateCategory extends Component {
    constructor(props) {
        super(props);

        this.onChangeCName = this.onChangeCName.bind(this);
        this.onChangeCDescription = this.onChangeCDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            cname : "",
            cdescription : ""
        }
    }

    onChangeCName(e){
        this.setState({
            cname: e.target.value
        });
    }

    onChangeCDescription(e){
        this.setState({
            cdescription: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const category = {
            cname : this.state.cname,
            cdescription : this.state.cdescription,
        }

        console.log(category);

        axios.post('http://localhost:4001/category/add', category)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Category Name: </label>
                    <input type="text" required className="form-control"
                           value={this.state.cname}
                           onChange={this.onChangeCName}/>
                </div>

                <div className="form-group">
                    <label>Category Description: </label>
                    <input type="text" required className="form-control"
                           value={this.state.cdescription}
                           onChange={this.onChangeCDescription}/>
                </div>

                <div className="form-group">
                    <input type="submit" value="Add Category" className="btn btn-primary"/>
                </div>
            </form>
        );
    }
}

