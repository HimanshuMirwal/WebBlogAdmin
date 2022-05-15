import Axios from "axios";
import React, { Component } from "react";
export default class DisplaySubTittle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SubTitleArray: [],
            SubtitleChangedValue: "",
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Deleted Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccessUpdate: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Updated Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',

        }
        this.OnClickDeleteDataForSubtitle = this.OnClickDeleteDataForSubtitle.bind(this);
        this.OnClickSubtitleChangeValue = this.OnClickSubtitleChangeValue.bind(this);
        this.OnChangeSubtitleTextChangeHandler = this.OnChangeSubtitleTextChangeHandler.bind(this);
        this.OnRefreshData = this.OnRefreshData.bind(this);

    }
    componentDidMount() {
        Axios.get("https://obscure-lake-21900.herokuapp.com/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    SubTitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
    }
    OnRefreshData() {
        Axios.get("https://obscure-lake-21900.herokuapp.com/subtittle/getsubtitle/").then((res) => {
            // console.log(res)
            this.setState({
                SubTitleArray: res.data
            })
        })
            .catch(Err => console.log(Err));
        this.state.SubTitleArray.map((data, index) => {
            document.getElementById("SubTitleClear" + index).setAttribute("value", "");
            document.getElementById("SubTitleClear" + index).value = ""
        })
    }
    OnClickDeleteDataForSubtitle(value, NameOfSubtitle) {
        Axios.post("https://obscure-lake-21900.herokuapp.com/subtittle/delete/" + value, { NameOfSubtitle: NameOfSubtitle })
            .then(res => {
                this.OnRefreshData();
                console.log(res)
                document.getElementById("DisplaySubtitle").innerHTML = this.state.DivSuccess
            })
            .catch(Err => {
                console.log(Err)
                document.getElementById("DisplaySubtitle").innerHTML = this.state.DivWarn

            });

    }
    OnChangeSubtitleTextChangeHandler(e) {
        const value = e.target.value;
        this.setState({
            SubtitleChangedValue: value
        })
    }
    OnClickSubtitleChangeValue(value, index) {
        const data = document.getElementById(value).value;
        Axios.post("https://obscure-lake-21900.herokuapp.com/subtittle/update/" + value, { SubTitleValue: this.state.SubtitleChangedValue })
            .then((res) => {
                console.log(res.data + " if not then Click Refresh Button to see Results.")
                this.OnRefreshData();
                document.getElementById("SubTitleClear" + index).setAttribute("value", "");
                document.getElementById("SubTitleClear" + index).value = ""
                document.getElementById("DisplaySubtitle").innerHTML = this.state.DivSuccessUpdate
            })
            .catch(Err => {
                console.log(Err)
                document.getElementById("DisplaySubtitle").innerHTML = this.state.DivWarn
            });
        this.setState({
            SubtitleChangedValue: ""
        })

        Axios.post("https://obscure-lake-21900.herokuapp.com/place/updateSubtitle/" + this.state.SubtitleChangedValue, { DataToSend: data })
            .then(res => console.log(res.data))
            .catch(Err => console.log(Err));
    }
    render() {
        return (
            <>
                
                <div className="container-fluid" >
                <div id="DisplaySubtitle">
                </div>
                    <table class="table table-striped table-dark" id="SubTitleTableDetail">
                        <thead>
                            <tr>
                                <th colSpan="4" style={{ textAlign: "center" }}>
                                    <h2>Table Edit Subtitle</h2>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Sub Title</th>
                                <th scope="col">Title</th>
                                <th>
                                    <label style={{ width: "20%" }}>Operation</label>
                                    <button style={{ float: "right" }} class="btn btn-warning" onClick={() => this.OnRefreshData()} type="button">Refresh</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.SubTitleArray.map((Res, index) => {
                                    return <tr key={Res._id}>
                                        <th scope="row">{Res._id}</th>
                                        <td>{Res.subtittleName}</td>
                                        <td>{Res.TittleName}</td>
                                        <td>
                                            <label style={{ fontSize: "20px", textDecoration: "underline", margin: "1% auto" }}>Enter the new Subtitle value</label>
                                            <input type="hidden" id={Res._id} value={Res.subtittleName} />
                                            <input class="form-control mr-sm-2" type="text" id={"SubTitleClear" + index} onChange={(e) => this.OnChangeSubtitleTextChangeHandler(e)} placeholder="Enter subtitle value" />
                                            <button style={{ width: "100%", marginTop: "1%" }} onClick={() => this.OnClickSubtitleChangeValue(Res._id, index)} class="btn btn-success" type="button">Update</button>
                                            <br />
                                            <hr style={{ marginTop: "2%", marginBottom: "2%" }} />
                                            <button style={{ width: "100%", marginTop: "1%" }} className="btn btn-danger" onClick={() => this.OnClickDeleteDataForSubtitle(Res._id, Res.subtittleName)}>
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