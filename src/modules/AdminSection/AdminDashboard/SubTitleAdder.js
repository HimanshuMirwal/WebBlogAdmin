import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";
export default class SubTitleAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MainTitleArray: [],
            SubTitle:"",
            MainSelectedData : "",
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Added Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivFormError: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Please fill the form correctly.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
       
        }
        this.onChangeSubTitle = this.onChangeSubTitle.bind(this);
        this.onChangeTitle= this.onChangeTitle.bind(this);
        this.OnClickToAddSubTitleData = this.OnClickToAddSubTitleData.bind(this);
        this.OnClickToRefreshData = this.OnClickToRefreshData.bind(this);
    }
    componentDidMount() {
        Axios.get("http://localhost:5000/tittle/gettitle/")
            .then(
                (result) => {
                    this.setState({
                        MainTitleArray: result.data
                    });
                    // console.log(result.data);
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    OnClickToRefreshData() {
        Axios.get("http://localhost:5000/tittle/gettitle/")
            .then(
                (result) => {
                    this.setState({
                        MainTitleArray: result.data
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
            document.getElementById("TittleSelector").selectedIndex="0";
    }
    onChangeSubTitle(e) {
        const data = e.target.value;
        this.setState({
            SubTitle:data
        })
    }
    onChangeTitle(e) {
        const data = e.target.value;
        this.setState({
            MainSelectedData:data
        })
    }
      OnClickToAddSubTitleData(){
            const Data = this.state.SubTitle;
            const DataLenght = Data.length;
            const TitleValue = this.state.MainSelectedData;
            if(DataLenght > 0){
                Axios.post("http://localhost:5000/subtittle/submit",{state:Data,TittleName:TitleValue})
                .then(res=>{
                    console.log(res.data)
                    document.getElementById("subtittleAdder").innerHTML=this.state.DivSuccess
                    this.OnClickToRefreshData()
                })
                .catch(Err => {
                    console.log(Err)
                    document.getElementById("subtittleAdder").innerHTML=this.state.DivWarn
                });
            }else{
                document.getElementById("subtittleAdder").innerHTML=this.state.DivFormError
            }
            this.setState({
                SubTitle:""
            })
            document.getElementById("TittleSelector").selectedIndex="0"
      }
    render() {
        
        return (
            <div>
                <div style={{ width: "90%", backgroundColor:"#212529", color:"#fff", margin: "5% auto", border: "1px solid", padding: "2%" }}>
                <div id="subtittleAdder">

                </div>
                <div style={{margin:"0% 0px 8% 0"}}>
                <h2 style={{float:"left"}}>Sub-Title</h2>
                <button type="button" onClick={()=>this.OnClickToRefreshData()} className="btn btn-primary" style={{ float:"right" }}>Refresh</button>
                </div>
                   <br/>
                    <form method="post">
                        <div className="form-group" >
                            <label >Subject-name (like tour-travels, cooking etc.)</label>
                            <select className="form-control" id="TittleSelector" onChange={(e)=>this.onChangeTitle(e)}>
                                <option key="lklkm  qlkml">.......Click here to Choose......</option>
                                {
                                    this.state.MainTitleArray.map((res) => {
                                        return <option key={res.TittleName} value={res.TittleName}>{res.TittleName}</option>
                                    })
                                }
                            </select>
                            <label>Sub-title(like tour-travels=Haryana)</label>
                            <input type="text" onChange={(e)=>this.onChangeSubTitle(e)} value={this.state.SubTitle} className="form-control" />
                        </div>
                        <button type="button" onClick={()=>this.OnClickToAddSubTitleData()} className="btn btn-primary" style={{ margin: "2%" }}>Submit</button>
                    </form>
                </div>
            </div>
        )

    }
}