import React, { Component } from "react";
import axios from "axios";
export default class DisplayPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            Pass: "",
            ServerID:"",
            Div:null
        }
        this.updateDetails = this.updateDetails.bind(this);
        this.OnChangeId=this.OnChangeId.bind(this);
        this.OnChangePass=this.OnChangePass.bind(this);
    }

    componentDidMount() {
        axios.get("https://obscure-lake-21900.herokuapp.com/Password/getPassword")
            .then(res =>
                // console.log(res.data)
                this.setState({
                    ID: res.data[0].idAdmin,
                    Pass: res.data[0].passAdmin,
                    ServerID:res.data[0]._id,
                })
            )
            .catch(err => console.log(err))
    }
    updateDetails() {
        const data = {
            ID: this.state.ID,
            PASS: this.state.Pass,
            SERVERID:this.state.ServerID,
        }
            axios.post("https://obscure-lake-21900.herokuapp.com/Password/UpdatePassword", data)
                .then(res => {
                    axios.get("https://obscure-lake-21900.herokuapp.com/Password/getPassword")
                        .then(val =>{
                            this.setState({
                                ID: val.data[0].idAdmin,
                                Pass: val.data[0].passAdmin,
                            })
                            const Div = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>'+res.data+'</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'       
                            document.getElementById("notification").innerHTML=Div;
                        }
                        )
                        .catch(err => {
                            const Div = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>'+err+'</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'       
                            document.getElementById("notification").innerHTML=Div;
                            console.log(err)
                        })
                },
                )
                .catch(err => console.log(err))
        
    }
    OnChangeId(e) {
        const data = e.target.value
        this.setState({
            ID: data
        })
    }


    OnChangePass(e) {
        const data = e.target.value
        this.setState({
            Pass: data
        })
    }
    render() {
        return (
            <>
                
                <div className="container-fluid" >
                <div id="notification">
                
                </div>
                
                    <table class="table table-striped table-dark" id="MainTableDetail">
                        <thead>
                            <tr>
                                <th colSpan="4" style={{ textAlign: "center" }}>
                                    <h2>Password Table</h2>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">
                                    <input type="text" onChange={(e) => this.OnChangeId(e)} value={this.state.ID} className="form-control" />
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">PassWord</th>
                                <th scope="col">
                                    <input type="text" onChange={(e) => this.OnChangePass(e)} value={this.state.Pass} className="form-control" />
                                </th>
                            </tr>
                            <tr>
                                <th scope="col" colSpan="2" style={{ textAlign: "center" }}>
                                    <button className="btn btn-lg btn-info" onClick={() => this.updateDetails()}>
                                        Change
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                </div>
            </>

        )
    }
}