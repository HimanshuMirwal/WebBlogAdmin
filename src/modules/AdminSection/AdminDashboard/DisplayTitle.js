import Axios from "axios";
import React, { Component } from "react";
export default class DisplayTittle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TitleArray:[],
            TitleChangedValue:"",
            inPutBox : false,
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Deleted Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccessUpdate: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Updated Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
        }
        this.OnClickDeleteDataForTitle = this.OnClickDeleteDataForTitle.bind(this);
        this.OnRefreshData = this.OnRefreshData.bind(this);
        this.OnClickTitleChangeValue = this.OnClickTitleChangeValue.bind(this);
        this.OnChangeSubtitleTextChangeHandler = this.OnChangeSubtitleTextChangeHandler.bind(this);

    }
    componentDidMount() {
            Axios.get("https://obscure-lake-21900.herokuapp.com/tittle/gettitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                   TitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
    }
    OnClickDeleteDataForTitle(id, TitleName){
        Axios.post("https://obscure-lake-21900.herokuapp.com/tittle/deleteTitle/"+id,{TitleName:TitleName}).then((res) => {
            console.log(res.data);
            this.OnRefreshData();
            document.getElementById("DisplayTittle").innerHTML=this.state.DivSuccess

        })
        .catch(Err =>{
             console.log(Err)
             document.getElementById("DisplayTittle").innerHTML=this.state.DivWarn

            });
    }
    OnRefreshData(){
        Axios.get("https://obscure-lake-21900.herokuapp.com/tittle/gettitle/").then((res) => {
            // console.log(res)
            this.setState({
                TitleArray: res.data
            })
        })
        .catch(Err => console.log(Err));
        this.setState({
            inPutBox:true
        })
        this.state.TitleArray.map((data, index)=>{
            document.getElementById("text"+index).setAttribute("value","");
            document.getElementById("text"+index).value=""
        })
    }
    OnClickTitleChangeValue(value, index){
        const data = document.getElementById(value).value;
        Axios.post("https://obscure-lake-21900.herokuapp.com/tittle/updateTittle/"+data,{id:value,TitleValue:this.state.TitleChangedValue})
            .then((res )=> {
                console.log(res.data+" if not then Click Refresh Button to see Results.")
                document.getElementById("text"+index).setAttribute("value","");
                document.getElementById("text"+index).value=""
                this.OnRefreshData();
                document.getElementById("DisplayTittle").innerHTML=this.state.DivSuccessUpdate
            })
            .catch(Err => {
                console.log(Err)
                document.getElementById("DisplayTittle").innerHTML=this.state.DivWarn
            });
            this.setState({
                TitleChangedValue:"",
                inPutBox:false
            })
        
    }
    OnChangeSubtitleTextChangeHandler(e){
        const value = e.target.value;
        this.setState({
            TitleChangedValue:value
        })
    }
        render() {
        return (
            <>
                <div className="container-fluid" >
                    <div id="DisplayTittle">

                    </div>

                    <table class="table table-striped table-dark" id="SubTitleTableDetail">
                        <thead>
                        <tr>
                        <th colSpan="3" style={{textAlign:"center"}}>
                        <h2>Table Edit title</h2>
                        </th>
                        </tr>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col"> Title</th>
                                <th>
                                <label style={{width:"20%"}}>Operation</label> 
                                <button style={{float:"right"}} class="btn btn-warning" onClick={()=>this.OnRefreshData()} type="button">Refresh</button> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.TitleArray.map((Res, index) => {
                                    return <tr key={Res._id}>
                                        <th scope="row">{Res._id}</th>
                                        <td>{Res.TittleName}</td>
                                        <td>    
                                                <label style={{fontSize:"20px",textDecoration:"underline",margin:"1% auto"}}>Enter the new title value</label>
                                                <input type="hidden" id={Res._id} value={Res.TittleName}/>
                                                <input class="form-control mr-sm-2" id={"text"+index}  type="text" onChange={(e)=>this.OnChangeSubtitleTextChangeHandler(e)} placeholder="Enter subtitle value"/>
                                                <button style={{width:"100%",marginTop:"1%"}} onClick={()=>this.OnClickTitleChangeValue(Res._id, index)} class="btn btn-success" type="button">Update</button> 
                                           <br />
                                            <hr style={{ marginTop: "2%", marginBottom: "2%" }} />
                                            <button style={{width:"100%",marginTop:"1%"}} className="btn btn-danger" onClick={() => this.OnClickDeleteDataForTitle(Res._id,Res.TittleName)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}