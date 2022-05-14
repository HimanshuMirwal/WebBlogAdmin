import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";
import { Link } from "react-router-dom";
export default class NoticeDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Notices:[],
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Deleted Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',       
        }
        this.onChangeNoticeLink = this.onChangeNoticeLink.bind(this);
        this.onChangeNotice= this.onChangeNotice.bind(this);
        this.OnClickToDeleteNotice = this.OnClickToDeleteNotice.bind(this);
        this.RefreshData = this.RefreshData.bind(this);
    }
    componentDidMount(){
        Axios.get("notice/getnotice")
        .then(res=>{
            console.log(res.data)
            this.setState({
                Notices:res.data.map(val=>val)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    RefreshData(){
        Axios.get("notice/getnotice")
        .then(res=>{
            console.log(res.data)
            this.setState({
                Notices:res.data.map(val=>val)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    onChangeNoticeLink(e) {
        const data = e.target.value;
        this.setState({
            NoticeLink:data
        })
    }
    onChangeNotice(e) {
        const data = e.target.value;
        this.setState({
            Notice:data
        })
    }
      OnClickToDeleteNotice(id){
            Axios.post("notice/deletenotice/"+id)
            .then(res=>{
            console.log(res.data);
            this.RefreshData();
            document.getElementById("NoticeAdder").innerHTML=this.state.DivSuccess
            })
            .catch(Err=>{
            console.log(Err)
            document.getElementById("NoticeAdder").innerHTML=this.state.DivWarn
            })
      }
    render() {
        
        return (
            <div>
                <div style={{ width: "90%", margin:"auto"}}>
                <div id="NoticeAdder">

                </div>
                   <br/>
                    <table class="table table-striped table-dark" id="MainTableDetail">
                        <thead>
                            <tr>
                                <th colSpan="5" style={{ textAlign: "center" }}>
                                <h2>Published Notice</h2>                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Notice</th>
                                <th scope="col">Notice Link</th>
                                <th scope="col">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Notices.map((data,index) => {
                                    return <tr>
                                        {/* <td scope="col">{data._id}</td> */}
                                        <td scope="col" style={{width:"70%"}}>
                                            {data.Notice}
                                        </td>
                                        <td scope="col" style={{width:"70%"}}>
                                            {data.NoticeLink}
                                        </td>
                                        <td scope="col">
                                                <button className="btn btn-danger" onClick={() => this.OnClickToDeleteNotice(data._id)}>
                                                    Delete
                                                </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }
}