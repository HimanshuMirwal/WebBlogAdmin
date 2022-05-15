import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";
export default class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Notice:"",
            NoticeLink : "",
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Added Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivFormError: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Please fill the form correctly.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
       
        }
        this.onChangeNoticeLink = this.onChangeNoticeLink.bind(this);
        this.onChangeNotice= this.onChangeNotice.bind(this);
        this.OnClickToAddNotice = this.OnClickToAddNotice.bind(this);
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
      OnClickToAddNotice(){
            const NoticeLink = this.state.NoticeLink;
            const Notice = this.state.Notice;
            const NoticeLength = Notice.length;
            // http://localhost:5000/notice/postnotice
            if(NoticeLength > 0){
                Axios.post("http://localhost:5000/notice/postnotice",{NoticeLink:NoticeLink,Notice:Notice})
                .then(res=>{
                    console.log(res.data)
                    document.getElementById("NoticeAdder").innerHTML=this.state.DivSuccess
                })
                .catch(Err => {
                    console.log(Err)
                    document.getElementById("NoticeAdder").innerHTML=this.state.DivWarn
                });
            }else{
                document.getElementById("NoticeAdder").innerHTML=this.state.DivFormError
            }
            this.setState({
                NoticeLink:"",
                Notice:""
            })
      }
    render() {
        
        return (
            <div>
                <div style={{ width: "90%", backgroundColor:"#212529", color:"#fff", margin: "5% auto", border: "1px solid", padding: "2%" }}>
                <div id="NoticeAdder">

                </div>
                <div>
                <h2>Publish Notice</h2>
                <hr/>
                </div>
                   <br/>
                    <form method="post">
                        <div className="form-group" >
                            <label >Notice Name</label>
                            <input type="text" value={this.state.Notice} onChange={(e)=>this.onChangeNotice(e)} className="form-control" />
                            <label>Notice Link</label>
                            <input type="text" onChange={(e)=>this.onChangeNoticeLink(e)} value={this.state.NoticeLink} className="form-control" />
                        </div>
                        <button type="button" onClick={()=>this.OnClickToAddNotice()} className="btn btn-primary" style={{ margin: "2% 0" }}>Submit</button>
                    </form>
                </div>
            </div>
        )

    }
}