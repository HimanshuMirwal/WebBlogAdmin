import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export default class DisplayFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FeedbackArray: [],
            ReplyValue: "",
            FeedbakValue:"",
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivForm: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please, Fill Form correctly.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccessUpdate: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Reply Send Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
        }
        this.onClickFunction = this.onClickFunction.bind(this);
        this.OnDeleteFeedback = this.OnDeleteFeedback.bind(this);
    }
    
    componentDidMount() {
        axios.get("https://obscure-lake-21900.herokuapp.com/feedback/getfeedback")
            .then(res =>
                this.setState({
                    FeedbackArray: res.data
                })
            )
            .catch(err => console.log(err))
    }
    onClickFunction(EmailRecepient, Name, Feedback, index) {
        const data = this.state.ReplyValue.length;
        if(data > 0){
        axios.post("https://obscure-lake-21900.herokuapp.com/feedback/replyfeedback/", { EmailRecepient: EmailRecepient, message: this.state.ReplyValue, NameOfRecepient: Name,FeedbackMessage:Feedback })
            .then(res => {
                console.log(res.data);
                document.getElementById("DisplayFedback").innerHTML=this.state.DivSuccessUpdate  
            })
            .catch(Err => { 
                alert(Err) 
                document.getElementById("DisplayFedback").innerHTML=this.state.DivWarn  
            })
        }else{
            document.getElementById("DisplayFedback").innerHTML=this.state.DivForm  
        }
            document.getElementById("TextArea"+index).setAttribute("value","");
            document.getElementById("TextArea"+index).value=""
    }
    
    OnDeleteFeedback(id) {
        axios.post("https://obscure-lake-21900.herokuapp.com/feedback/deletefeedback/" + id)
            .then(res => {
                console.log(res.data)
                axios.get("https://obscure-lake-21900.herokuapp.com/feedback/getfeedback")
                    .then(res =>
                        this.setState({
                            FeedbackArray: res.data
                        })
                    )
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    }
    onChangeReplyValue(e) {
        const data = e.target.value;
        // console.log(data)
        this.setState({
            ReplyValue: data
        })
    }
    
    render() {
        return (
            <>
                <div className="container-fluid" >
                <div id="DisplayFedback">

                </div>
                    <table class="table table-striped table-dark" id="MainTableDetail">
                        <thead>
                            <tr>
                                <th colSpan="4" style={{ textAlign: "center" }}>
                                    <h2>Feedback Table</h2>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Feedback</th>
                                <th scope="col">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.FeedbackArray.map((data,index) => {
                                    return <tr>
                                        {/* <td scope="col">{data._id}</td> */}
                                        <td scope="col" style={{width:"70%"}}>
                                            <h4>{data.Name}</h4>
                                            <h5>{data.Email}</h5>

                                            <abbr style={{textDecoration:"none"}} title={data.FeedbackDescription}>
                                                <p>{data.FeedbackDescription}</p>
                                            </abbr>
                                        </td>
                                        <td scope="col">
                                            <Link>
                                                <textarea rows="10" cols="10" id={"TextArea"+index} className="form-control" onChange={(e) => this.onChangeReplyValue(e)} >
                                                </textarea>
                                                <br />
                                                <button className="btn btn-info" onClick={() => this.onClickFunction(data.Email, data.Name, data.FeedbackDescription, index)}>
                                                    send Reply
                                                </button>
                                                <hr />
                                                <button className="btn btn-danger" onClick={() => this.OnDeleteFeedback(data._id)}>
                                                    Delete
                                                </button>
                                               
                                            </Link>
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