import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";

export default class PlaceAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MainTitleArray: [],
            SubTitleArray: [],
            selectArraySubTitle: [],
            SelectedSubTitle: "",
            SelectedTitle: "",
            city: "",
            TourPlace: "",
            TourPlaceDescription: "",
            selectedFile: null,
            imageLinksArray: [],
            imageCount: 3,
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccess: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Data Added Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivFormError: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Please fill the form correctly.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            invalidImage: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong>I think You forget to fill image links.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            duplicateImage: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong> Duplicate image Links present .</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',

        }
        this.onChangeSubTitle = this.onChangeSubTitle.bind(this);
        this.OnClickToAddTitleData = this.OnClickToAddTitleData.bind(this);
        this.OnChangeSelectedTitle = this.OnChangeSelectedTitle.bind(this);
        this.OnChangeSelectedSubTitle = this.onChangeSelectedSubTitle.bind(this);
        this.OnChangeCity = this.OnChangeCity.bind(this);
        this.OnChangeTourPlace = this.OnChangeTourPlace.bind(this);
        this.OnChangeTourPlaceDescription = this.OnChangeTourPlaceDescription.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.OnClickToRefreshData = this.OnClickToRefreshData.bind(this);
        this.onChangeImageText = this.onChangeImageText.bind(this);
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
        Axios.get("http://localhost:5000/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    SubTitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
    }

    onChangeImageText(event, index) {
        const data = event.target.value;
        const imageArray = this.state.imageLinksArray;
        imageArray[index] = data;
        this.setState({
            imageLinksArray: imageArray
        })
        document.getElementById("DisplayImage" + index).src = event.target.value;
    }
    OnClickToRefreshData() {
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
                    SubTitleArray: res.data,
                })
            })
            .catch(Err => console.log(Err));
        this.setState({
            imageLinksArray: []
        })
        document.getElementById("titleDropdow").selectedIndex = "0"
        document.getElementById("SubTitleDropdow").selectedIndex = "0"
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

    OnClickToAddTitleData(e) {
        const TitleName = this.state.SelectedTitle;
        const SubTitleName = this.state.SelectedSubTitle;
        const city = this.state.city;
        const PlaceToTour = this.state.TourPlace;
        const TourPlaceDescription = this.state.TourPlaceDescription;
        const imageLinksArray = this.state.imageLinksArray;
        console.log(imageLinksArray);
        let count = this.state.imageLinksArray.length;

        const ImageArray = this.state.imageLinksArray;
        const duplicateArray = ImageArray.reduce(function (acc, el, i, arr) {
            if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
        }, []);

        const duplicateLength = duplicateArray.length;
        const data = new FormData()
        for (var x = 0; x < this.state.imageLinksArray.length; x++) {
            data.append('imageLinksArray', this.state.imageLinksArray[x])
        }
        data.append("TittleName", TitleName);
        data.append("state", SubTitleName);
        data.append("city", city);
        data.append("TourPlace", PlaceToTour);
        data.append("TourPlaceDescription", TourPlaceDescription);
        if (duplicateLength === 0) {
            console.log("duplicateArray" + duplicateArray.length)
            console.log(count);
            if (count !== 0) {
                if (PlaceToTour.length > 0 && TourPlaceDescription.length > 0) {
                    Axios.post("http://localhost:5000/place/add/", data)
                        .then(res => {
                            console.log(res.data);
                            document.getElementById("PlaceAdder").innerHTML = this.state.DivSuccess
                        })
                        .catch(Err => {
                            console.log(Err);
                            document.getElementById("PlaceAdder").innerHTML = this.state.DivWarn
                        });
                    this.setState({
                        city: "",
                        TourPlace: "",
                        TourPlaceDescription: "",
                        imageLinksArray: [],
                        selectArraySubTitle: [],
                    });
                    this.OnClickToRefreshData();
                } else {
                    console.log("please Fill the data Correctely.");
                    document.getElementById("PlaceAdder").innerHTML = this.state.DivFormError
                }
            } else {
                console.log("Please insert The Image links .")
                document.getElementById("PlaceAdder").innerHTML = this.state.invalidImage
            }
        } else {
            console.log("Duplicate image links are present.")
            document.getElementById("PlaceAdder").innerHTML = this.state.duplicateImage
        }
    }
    OnChangeCity(e) {
        const data = e.target.value;
        this.setState({
            city: data
        })
    }
    onChangeSelectedSubTitle(e) {
        const data = e.target.value;
        this.setState({
            SelectedSubTitle: data
        })
    }
    OnChangeSelectedTitle(e) {
        const data = e.target.value;
        this.setState({
            SelectedTitle: data
        })
    }
    OnChangeTourPlace(e) {
        const data = e.target.value;
        this.setState({
            TourPlace: data
        })
    }
    OnChangeTourPlaceDescription(e) {
        const data = e.target.value;
        this.setState({
            TourPlaceDescription: data
        })
    }
    onChangeHandler(event) {
        this.setState({
            selectedFile: event.target.files,
        })
    }
    render() {
        return (
            <div>
                <div style={{ width: "90%", background: "#212529", color: "#fff", margin: "5% auto", border: "1px solid", padding: "2%" }}>
                    <div id="PlaceAdder">

                    </div>
                    <div style={{ margin: "0% 0px 8% 0" }}>
                        <h3 style={{ width: "20%", float: "left" }}>Description</h3>
                        <button type="button" onClick={() => this.OnClickToRefreshData()} className="btn btn-primary" style={{ float: "right" }}>Refresh</button>
                    </div>
                    <form method="POST">
                        <div className="form-group">
                            <label>Subject-name (like tour-travels, cooking etc.)</label>
                            <select className="form-control" id="titleDropdow" name="TittleName" onChange={(e) => { this.onChangeSubTitle(e); this.OnChangeSelectedTitle(e) }}>
                                <option key="lklkm  qlkml" >.......Click here to Choose......</option>
                                {
                                    this.state.MainTitleArray.map((res) => {
                                        return <option key={res.TittleName} value={res.TittleName}>{res.TittleName}</option>
                                    })
                                }
                            </select>
                            <label>Sub-title(like tour-travels=Haryana)</label>
                            <select className="form-control" id="SubTitleDropdow" name="state" onChange={(e) => this.OnChangeSelectedSubTitle(e)} >
                                <option key="lklkm  qlkml">.......Click here to Choose......</option>
                                {
                                    this.state.selectArraySubTitle.map((res) => {
                                        return <option key={res} value={res}>{res}</option>
                                    })
                                }
                            </select>
                            <label>city-name</label>
                            <input type="text" name="city" placeholder="optional" value={this.state.city} onChange={(e) => this.OnChangeCity(e)} className="form-control" />
                            <label>place-name</label>
                            <input type="text" name="TourPlace" value={this.state.TourPlace} onChange={(e) => this.OnChangeTourPlace(e)} className="form-control" />
                            <label>place-description</label>
                            <textarea rows="15" name="TourPlaceDescription" value={this.state.TourPlaceDescription} onChange={(e) => this.OnChangeTourPlaceDescription(e)} className="form-control" >
                            </textarea>
                            {/* <label>Images</label>
                            <input type="file" id="FileToUpload" class="form-control" multiple onChange={this.onChangeHandler} /> */}
                        </div>
                        <div class="row" style={{ margin: "2% auto" }}>
                            <h4 style={{ width: "80%", float: "left" }}>Images Section</h4>
                            <div style={{ width: "100%"}} class="alert alert-info alert-dismissible fade show" role="alert">
                                <strong>Important : One image link is compulsory.</strong>
                            </div>
                            <ImageElement value={this.state.imageLinksArray} onChangeImageText={this.onChangeImageText} />
                        </div>
                        <button type="button" onClick={() => this.OnClickToAddTitleData()} className="btn btn-primary" style={{ margin: "2%" }}>Submit</button>
                    </form>
                </div>
            </div>

        )

    }
}

const ImageElement = function (props) {
    console.log(props)
    const TextImg = props.value.length;
    return Array.apply(1, Array(6)).map(function (x, i) {
        return <div class="row" key={i} style={{ margin: "2% auto" }}>
            <input type="text" id={"TextImage" + i}  value={TextImg === 0 ? "" : props.value[i]} onChange={(e) => props.onChangeImageText(e, i)} style={{ width: "50%", float: "left" }} className="form-control" placeholder={"insert image " + (i + 1) + " link here"} />
            <img src={TextImg === 0 ? "" : props.value[i]} id={"DisplayImage" + i} style={{ height: "100%", width: "50%", backgroundPosition: "auto", float: "right" }} className="form-control" alt="not inserted yet" />
        </div>
    })
}