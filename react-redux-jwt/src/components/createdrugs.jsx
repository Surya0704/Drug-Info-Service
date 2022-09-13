import React, { Component } from 'react'
//import EmployeeService from '../services/EmployeeService';
import DrugService from '../services/drugService';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class CreateDrugComponent extends Component {

    
    
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            drugName: '',
            drugPrice: '',
            drugQuantity: '',
            expiryDate: ''
        }
        this.changedrugNameHandler = this.changedrugNameHandler.bind(this);
        this.changedrugPriceHandler = this.changedrugPriceHandler.bind(this);
        this.changedrugQuantityHandler = this.changedrugQuantityHandler.bind(this);
        this.changeexpiryDateHandler = this.changeexpiryDateHandler.bind(this);
        this.saveOrUpdateDrug = this.saveOrUpdateDrug.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            DrugService.getDrugById(this.state.id).then((res) => {
                let drug = res.data;
                this.setState({
                    drugName: drug.drugName,
                    drugPrice: drug.drugPrice,
                    drugQuantity: drug.drugQuantity,
                    expiryDate: drug.expiryDate
                });
            });
        }
    }
    saveOrUpdateDrug = (e) => {
        e.preventDefault();
        let drug = { drugName: this.state.drugName, drugPrice: this.state.drugPrice,drugQuantity:this.state.drugQuantity, expiryDate: this.state.expiryDate };
        console.log('drug => ' + JSON.stringify(drug));

        // step 5
        if (this.state.id === 'save') {
            DrugService.saveDrugs(drug).then(res => {
                this.props.history.push('/profile');
            });
        } else {
            DrugService.updateDrugs(drug, this.state.id).then(res => {
                this.props.history.push('/profile');
            });
        }
    }

    changedrugNameHandler = (event) => {
        this.setState({ drugName: event.target.value });
    }
    changedrugPriceHandler = (event) => {
        this.setState({ drugPrice: event.target.value });
    }
    changedrugQuantityHandler = (event) => {
        this.setState({ drugQuantity: event.target.value });
    }
    changeexpiryDateHandler = (event) => {
        this.setState({ expiryDate: event.target.value });
    }

    cancel() {
        this.props.history.push('/drugs');
    }

    getTitle() {
        if (this.state.id === 'save') {
            return <h3 className="text-center">Add Drugs</h3>
        } else {
            console.log(this.state.id);
            return <h3 className="text-center">Update Drugs</h3>            
        }
    }
    
    render() {

        /*const { user: currentUser } = this.props;
        
        if (!currentUser) {
            return <Redirect to="/login" />;
          }*/
        return (
            
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-10 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Drug Name: </label>
                                        <input placeholder="First Name" name="drugName" className="form-control"
                                            value={this.state.drugName} onChange={this.changedrugNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Drug Price: </label>
                                        <input placeholder="Last Name" name="drugPrice" className="form-control"
                                            value={this.state.drugPrice} onChange={this.changedrugPriceHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Quantity: </label>
                                        <input placeholder="Email Address" name="drugQuantity" className="form-control"
                                            value={this.state.drugQuantity} onChange={this.changedrugQuantityHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Date: </label>
                                        <input placeholder="Email Address" name="expiryDate" className="form-control"
                                            value={this.state.expiryDate} onChange={this.changeexpiryDateHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateDrug}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateDrugComponent