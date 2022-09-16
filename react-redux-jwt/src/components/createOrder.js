import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link } from "react-router-dom";
import Navbar_beforeLogin from "./Navbar_beforeLogin";
import './login.css'
import orderService from "../services/orderService";

import { connect } from "react-redux";
//import { register } from "../actions/auth";
class AddOrder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // step 2
            
            date: "",
            quantity: "",
            drugname: "",
            doctorname: "",
            successful: false,
        }
        
        this.changedateHandler = this.changedateHandler.bind(this);
        this.changequantityHandler = this.changequantityHandler.bind(this);
        this.changedrugnameHandler = this.changedrugnameHandler.bind(this);
        this.changedoctornameHandler = this.changedoctornameHandler.bind(this);
        this.saveOrder = this.saveOrder.bind(this);

    } 

    saveOrder = (e) => {
        e.preventDefault();
        let order = {date: this.state.date, quantity: this.state.quantity, drugname: this.state.drugname, doctorname: this.state.doctorname };
        console.log('order => ' + JSON.stringify(order));
        //console.log("order successfully");

        // step 5

        orderService.saveOrder(order).then(res => {
            this.props.history.push('/Drugs');
            alert("Ordered successfully");
            console.log("order successfully");
        });
    }

    changedateHandler = (event) => {
        this.setState({ date: event.target.value });
    }
    changequantityHandler = (event) => {
        this.setState({ quantity: event.target.value });
    }
    changedrugnameHandler = (event) => {
        this.setState({ drugname: event.target.value });
    }
    changedoctornameHandler = (event) => {
        this.setState({ doctorname: event.target.value });
    }






render(){
    const { message } = this.props;

    return (
        <div>
            <Navbar_beforeLogin />

            <Form
                onSubmit={this.saveOrder}
                ref={(c) => {
                    this.form = c;
                }}
            >              
                    
                        <div className="col-md-6 card bg-light text-dark"  >
                            <h1>
                                <center>Place your Order</center>
                            </h1>

                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <Input
                                            type="Date"
                                            className="form-control"
                                            name="date"
                                            value={this.state.date}
                                            onChange={this.changedateHandler}
                                            
                                            placeholder="Enter the date"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Input
                                            type="number"
                                            className="form-control"
                                            name="quanityt"
                                            value={this.state.quantity}
                                            onChange={this.changequantityHandler}
                                            
                                            placeholder="Enter the no of drugs you want"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="drugname"
                                            value={this.state.drugname}
                                            onChange={this.changedrugnameHandler}
                                            
                                            placeholder="Enter the drugname"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="doctorname"
                                            value={this.state.doctorname}
                                            onChange={this.changedoctornameHandler}
                                            
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-dark btn-block">Order</button>
                                        <h2></h2>
                                        <p>
                                            <i>
                                                <h6>
                                                    Already Have an Account ?{" "}
                                                    <Link to="/login" className="formFieldLink">
                                                        Sign In
                                                    </Link>
                                                </h6>
                                            </i>
                                        </p>
                                    </div>
                                    {/* <p className="mt-3">Already Have an Account <a href="login.components.js">Sign In</a></p> */}
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                    this.checkBtn = c;
                                }}
                            />

                        </div>
                    
               
            </Form>
        </div>

    );
}
}



export default AddOrder;
