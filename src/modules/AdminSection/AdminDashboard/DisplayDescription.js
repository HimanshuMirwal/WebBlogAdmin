import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class DisplayDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PlaceDataArray: [],
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Deleted Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccessUpdate: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Updated Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',

        }
        this.OnClickDeleteDescriptionData = this.OnClickDeleteDescriptionData.bind(this);
        this.OnRefreshData = this.OnRefreshData.bind(this);
    }
    componentDidMount() {
        Axios.get("https://obscure-lake-21900.herokuapp.com/place/getplace/")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    PlaceDataArray: res.data
                })
            }).catch(err => alert(err));
    }
    
    OnRefreshData(){
        Axios.get("https://obscure-lake-21900.herokuapp.com/place/getplace/")
        .then((res) => {
            console.log(res.data);
            this.setState({
                PlaceDataArray: res.data
            })
        }).catch(err => alert(err));
    }
    OnClickDeleteDescriptionData(id) {
        Axios.post("https://obscure-lake-21900.herokuapp.com/place/delete/" + id)
            .then(res => {
                console.log(res.data+" Click Refresh Button to see Results.")
                this.OnRefreshData()
                document.getElementById("DisplayDescription").innerHTML=this.state.DivSuccess
            })
            .catch(Err => {console.log(Err)
                document.getElementById("DisplayDescription").innerHTML=this.state.DivWarn
            });
    }
    OnChangeSubtitleTextChangeHandler(e){
        const value = e.target.value;
        this.setState({
            SubtitleChangedValue:value
        })
    }
        render() {
        return (
            <>
                <div className="container-fluid" >
                <div id="DisplayDescription">

                </div>

                <table class="table table-striped table-dark" id="MainTableDetail">
                        <thead>
                        <tr>
                        <th colSpan="6" style={{textAlign:"center"}}>
                            <h2>Table Edit Full Detail of blog Information</h2>
                        </th>
                        </tr>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Sub Title</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Subject Title</th>
                                <th scope="col">
                                <label style={{float:"left"}} >Description</label>
                                <input type="button" className="btn btn-warning" value="Refresh" style={{float:"right"}} onClick={()=>this.OnRefreshData()}/>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.PlaceDataArray.map((Res) => {
                                    return <tr key={Res._id}>
                                        <th scope="row">{Res._id}</th>
                                        <td>{Res.TittleName}</td>
                                        <td>{Res.subtittleName}</td>
                                        <td>{Res.city}</td>
                                        <td>{Res.PlaceForTour}</td>
                                        <td>
                                            <Link to={"/edit:" + Res._id} target="blank">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
                                                    Edit
                                             </button>
                                            </Link>
                                            <hr style={{ marginTop: "2%", marginBottom: "2%" }} />
                                            <button className="btn btn-danger" onClick={() => this.OnClickDeleteDescriptionData(Res._id)}>
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