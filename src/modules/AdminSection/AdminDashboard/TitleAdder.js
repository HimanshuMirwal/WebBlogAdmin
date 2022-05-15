import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";
export default class TitleAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MainTitleData: "",
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Added Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivFormError: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Please fill the form correctly.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.OnClickToAddTitleData = this.OnClickToAddTitleData.bind(this);
    }
    onChangeTitle(e) {
        const data = e.target.value;
        this.setState({
            MainTitleData:data
        })
    }
    OnClickToAddTitleData() {
        const Data = this.state.MainTitleData;
        const DataLen = Data.length;
        if(DataLen > 0){
            Axios.post("http://localhost:5000/tittle/send",{TittleName:Data})
            .then(res=>{
                console.log(res.data)
                document.getElementById("TittleAdder").innerHTML=this.state.DivSuccess
            })
            .catch(Err => {
                console.log(Err)
                document.getElementById("TittleAdder").innerHTML=this.state.DivWarn
            });
        }else{
            console.log("Please Enter the Data Properly!")
            document.getElementById("TittleAdder").innerHTML=this.state.DivFormError
        }
        this.setState({
            MainTitleData:""
        })
    }
    render() {
        return (
                <div style={{ width: "90%",  backgroundColor:"#212529", color:"#fff", margin: "5% auto", border: "1px solid", padding: "2%" }}>
                    <div id="TittleAdder">

                    </div>
                    <h3>Add Title</h3>
                    <form action="" method="POST">
                        <div className="form-group">
                            <label>Subject-name (like tour-travels, cooking etc.)</label>
                            <input type="text" onChange={(e)=>this.onChangeTitle(e)} value={this.state.MainTitleData} className="form-control" />
                        </div>
                        <button type="button" onClick={()=>this.OnClickToAddTitleData()} className="btn btn-primary" style={{ margin: "2%" }}>Submit</button>
                    </form>
                </div>

        )

    }
}