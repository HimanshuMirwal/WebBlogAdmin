import React, { Component } from "react";
import "./css/AdminLogin.css";
import Footer from "../../FooterSection/Footer"
import Axios from "axios";
import AdminCode from "../AdminCode/AdminCode";

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginID: "",
            LoginPassword: "",
            auth:false
        }
        this.OnChangeLoginID = this.OnChangeLoginID.bind(this);
        this.OnChangeLoginPassword = this.OnChangeLoginPassword.bind(this);
        this.OnClickSubmitButton = this.OnClickSubmitButton.bind(this);
        this.HelperFunctionForAxios = this.HelperFunctionForAxios.bind(this);
        this.getPassToMail = this.getPassToMail.bind(this);
    }
    OnChangeLoginPassword(e) {
        const data = e.target.value;
        this.setState({
            LoginID: data
        })
    }
    OnChangeLoginID(e) {
        const data = e.target.value;
        this.setState({
            LoginPassword: data
        })
    }
    OnClickSubmitButton(e) {
        e.preventDefault();
        console.log(e)
        const IDLen = this.state.LoginID.length;
        const PassLen = this.state.LoginPassword.length;
        const ID = this.state.LoginID;
        const Pass = this.state.LoginPassword;
        console.log(ID + "  " + Pass);
        const Data = {
            ID: ID,
            Pass: Pass,
            auth: true
        }
        if (IDLen < 9 && PassLen < 9) {
            alert("Error");
        } else {
            Axios.post("https://cors-anywhere.herokuapp.com/https://obscure-lake-21900.herokuapp.com/admin/get/", Data)
                .then((res) => {
                    this.HelperFunctionForAxios(res);
                    console.log(res)
                })
                .catch(Err => console.log(Err));
        }
    }
    HelperFunctionForAxios(res) {
        // alert(res.data)
        if (res.data === "0015") {
            alert("Enter the Code Send To Your Email!");
            this.setState({
                auth: true
            });
        } 
        else {
            alert(res.data + " ID or Password incorrect.")
            this.setState({
                auth: false,
            })
        }
    }
    getPassToMail(){
        alert("Login Credentials are send to Admin mail.")
        Axios.get("https://cors-anywhere.herokuapp.com/https://obscure-lake-21900.herokuapp.com/Password/sendpasswordtome")
        .then((res) => {
            console.log("Login Credentials are send to Admin mail.")
        })
        .catch(Err => console.log(Err));
    }
    render() {
        if (this.state.auth === true) {
            return <AdminCode />
        }
        if(this.state.count > 3){
            this.getPassToMail()
        }
        return (
            <>
                <div className="MainAdminLogin">
                    <div className="FormDivAdminLogin">
                        <div className="LogoDivAdmin">
                            <i className='fa fa-lock LogoIconAdmin' style={{ fontSize: "150px" }}> </i>
                        </div>
                        <h3 style={{ textAlign: "center" }}>Admin Login</h3>
                        <div className="DivFormAdminLogin">
                            <form method="post">
                                <div className="form-group">
                                    <input type="text" onChange={(e) => this.OnChangeLoginPassword(e)} className="form-control" />
                                </div>
                                <div className="form-group" style={{ marginTop: "5%" }}>
                                    <input type="password" onChange={(e) => this.OnChangeLoginID(e)} className="form-control" />
                                </div>
                                <button type="submit" onClick={(e) => this.OnClickSubmitButton(e)} className="btn btn-primary" style={{ marginTop: "5%" }}>Login</button>
                                <div className="form-group" style={{ marginTop: "5%" }}>                                    
                                </div>
                            </form>
                            <text onClick={()=>this.getPassToMail()}>Send Credentials</text>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}