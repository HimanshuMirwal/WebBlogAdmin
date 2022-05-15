import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import AdminDashboard from "../AdminDashboard/AdminDashboard";
export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            Authorized:false
        }
        this.OnChangeLoginID = this.OnChangeLoginID.bind(this);
        this.OnClickSubmitButton = this.OnClickSubmitButton.bind(this);
    }
    OnChangeLoginID(e) {
        const data = e.target.value;
        this.setState({
            code: data
        })
    }

    OnClickSubmitButton() {
        const data = this.state.code;
        Axios.post("http://localhost:5000/code/sendcode/", { dataValue: data }).then((res) => {
            if (res.data === "00015") {
                alert("OK!!!!");
                localStorage.setItem('AdminAuth', true);
                this.setState({
                    Authorized:true
                })
            } else {
                alert("INVALID CODE");
            }

        }).catch((Err) => {
            console.log(Err);
        });

    }
    render() {
            if(this.state.Authorized){
                return <AdminDashboard />
            }
            return (
                <>
                {this.state.AdminLoginStatusValue}
                    <div className="container col-6" style={{ border: "1px solid #ced4da", marginTop: "2%", }}>
                        <h3 style={{ textAlign: "center", color: "#323232" }}>Admin Login</h3>
                        <form>
                            <div className="form-group" style={{ marginTop: "5%" }}>
                                <label><h5>Enter Code</h5></label>
                                <input type="password" onChange={(e) => this.OnChangeLoginID(e)} className="form-control" />
                            </div>
                            <button type="button" onClick={() => this.OnClickSubmitButton()} className="btn btn-primary" style={{ marginTop: "5%" }}>Login</button>
                            <div className="form-group" style={{ marginTop: "5%" }}>
                            </div>
                        </form>
                    </div>
                </>
            )
        }
}