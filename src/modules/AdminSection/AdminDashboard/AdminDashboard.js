import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import TitleAdder from "./TitleAdder";
import SubTitleAdder from "./SubTitleAdder";
import PlaceAdder from './PlaceAdder';
import DisplayTitle from "./DisplayTitle";
import DisplaySubTittle from "./DisplaySubTitle";
import DisplayDescription from "./DisplayDescription";
import DisplayFeedback from "./DisplayFeedback";
import DisplayPassword from "./DisplayPassword";

import About from "./About";
import Notice from "./Notice";
import NoticeDisplay from "./NoticeDisplay";
export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        let Auth = false;
        let AuthSes = localStorage.getItem('AdminAuth');
        if (AuthSes) {
            Auth = true
        }
        this.state = {
            MainTitleArray: [],
            SubTitleArray: [],
            selectArraySubTitle: [],
            AdminDashboardAuth: Auth,
            displayRecord: true,
            AddRecord: false,
            Clicked: "AddTittle",
            AddTittle: true,
            AddSubTittle: false,
            AddDescription: true,
            DisplayTittle: true,
            DisplaySubTittle: true,
            DisplayDescription: true,

        }
        this.onChangeSubTitle = this.onChangeSubTitle.bind(this);
        this.OnClickLogout = this.OnClickLogout.bind(this);
        this.OnClickToAddTitleData = this.OnClickToAddTitleData.bind(this);
        this.displayEditDisplayRecord = this.displayEditDisplayRecord.bind(this);
        this.displayAddRecord = this.displayAddRecord.bind(this);
        this.findClick = this.findClick.bind(this);
        this.OnLogout = this.OnLogout.bind(this);
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
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
        Axios.get("http://localhost:5000/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    SubTitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload);
    }

    handleUnload(e) {
        alert("closing!!!!!");
        localStorage.removeItem("AdminLoginFeedback");
        localStorage.removeItem("AdminAuth");
    }
    onChangeSubTitle(e) {
        const data = e.target.value;
        const arrayData = [];
        this.state.SubTitleArray.map((res) => {
            if (res.TittleName === data) {
                arrayData.push(res.subtittleName);
            }
        })
        this.setState({
            selectArraySubTitle: arrayData
        })
        console.log(arrayData);
    }
    OnClickLogout() {
        localStorage.removeItem("AdminLoginFeedback");
        localStorage.removeItem("AdminAuth");
    }


    OnClickToAddTitleData() {

    }
    displayAddRecord() {
        this.setState({
            displayRecord: false,
            AddRecord: true
        })
    }
    displayEditDisplayRecord() {
        this.setState({
            displayRecord: true,
            AddRecord: false
        })
    }
    OnLogout(data) {
        localStorage.removeItem("Auth")
        localStorage.removeItem("AdminAuth")
        localStorage.clear();
        window.location.href = "/"
    }
    findClick(data) {
        switch (data) {
            case "AddTittle":
                this.setState({ Clicked: data })
                break;
            case "AddSubTittle":
                this.setState({ Clicked: data })
                break;
            case "AddDescription":
                this.setState({ Clicked: data })
                break;
            case "DisplayTittle":
                this.setState({ Clicked: data })
                break;
            case "DisplaySubTittle":
                this.setState({ Clicked: data })
                break;
            case "DisplayDescription":
                this.setState({ Clicked: data })
                break;
            case "DisplayFeedback":
                this.setState({ Clicked: data })
                break;
            case "About":
                this.setState({ Clicked: data })
                break;
            case "DisplayPassword":
                this.setState({ Clicked: data })
                break;
            case "AddNotice":
                this.setState({ Clicked: data })
                break;
                
            case "NoticeDisplay":
                this.setState({ Clicked: data })
                break;

            default: ;
        }
    }

    render() {
        if (this.state.AdminDashboardAuth === false) {
            return <Redirect to="/login" />
        }
        switch (this.state.Clicked) {
            case "AddTittle":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <TitleAdder />
                    </div>
                </div>)
            case "AddSubTittle":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <SubTitleAdder />
                    </div>
                </div>)
            case "AddDescription":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <PlaceAdder />
                    </div>
                </div>)
            case "AddNotice":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <Notice />
                    </div>
                </div>)
            case "DisplayTittle":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <DisplayTitle />
                    </div>
                </div>)
            
            case "DisplaySubTittle":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <DisplaySubTittle />
                    </div>
                </div>)
            case "DisplayDescription":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <DisplayDescription />
                    </div>
                </div>)
            case "DisplayFeedback":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <DisplayFeedback />
                    </div>
                </div>)
            case "DisplayPassword":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <DisplayPassword />
                    </div>
                </div>)
            case "NoticeDisplay":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <NoticeDisplay />
                    </div>
                </div>)
            case "About":
                return (<div className="main">
                    <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                    <div className="InfoDiv">
                        <About />
                    </div>
                </div>)
            
            default: return (<div className="main">
                <SideBar findClick={this.findClick} Logout={this.OnLogout} />
                <div className="InfoDiv"><h4>Not found</h4></div>
            </div>);
        }
    }
}

const SideBar = function (props) {
    return (<div className="container-fluid">
        <nav id="navbarNavDropdown" style={{ overflowY: "scroll" }} class="collapse d-lg-block sidebar collapse">
            <div class="position-sticky">
                <hr style={{ color: "#fff" }} />
                <ul className="NavAdminLink">
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("AddTittle")}>Add Tittle</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("AddSubTittle")}>Add Sub Tittle</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("AddDescription")}>Add Description</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("AddNotice")}>Add Notice</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("DisplayTittle")}>Display Tittle</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("DisplaySubTittle")}>Display Sub Tittle</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("DisplayDescription")}>Display Description</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("DisplayFeedback")}>Display Feedback</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("DisplayPassword")}>Display Password</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("NoticeDisplay")}>Display Notice</li>
                    <li className="NavAdminLinkItem" onClick={() => props.findClick("About")}>Display About</li>
                    <li style={{ paddingTop: "15px" }}>
                        {/* <Link > */}
                        <input onClick={() => props.Logout("data")} type="button" className="btn btn-lg btn-primary btn-block" style={{ width: "100%" }} value="Log Out" />
                        {/* </Link> */}
                    </li>
                </ul>
            </div>
        </nav>
        <nav id="main-navbar" style={{ padding: "20px", backgroundColor: "#212529" }} class="navbar navbar-expand-lg navbar-light bg-dark-gray fixed-top">
            <div className="container-fluid">
                <h1 className="navbar-brand" style={{ color: "#fff", padding: "10px" }}>
                    WebBlog
                </h1>
                <hr />
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            </div>
        </nav>
    </div>
    )
}