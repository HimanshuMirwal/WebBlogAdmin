import React, { Component } from "react";
import Axios from "axios";


export default class Modal extends Component {
    constructor(props) {
        super(props);
        const  Auth = localStorage.getItem("AdminAuth");
        if(!Auth){
            // exit()
            window.location.href="/"
        }
        this.state = {
            TittleName: "",
            SubTittleName: "",
            city: "",
            TourPlace: "",
            TourPlaceDescription: "",
            id: "",
            imageLinksArray: [],
        }
        this.OnChangeCity = this.OnChangeCity.bind(this);
        this.OnChangeTourPlace = this.OnChangeTourPlace.bind(this);
        this.OnChangeTourPlaceDescription = this.OnChangeTourPlaceDescription.bind(this);
        this.OnClickSubmitButton = this.OnClickSubmitButton.bind(this);
        this.onChangeImageText = this.onChangeImageText.bind(this);
    }
    componentDidMount() {
        const  Auth = localStorage.getItem("AdminAuth");
        if(!Auth){
            window.location.href="/"
        }
        const len = this.props.match.params.id.length;
        const data = this.props.match.params.id.substring(1, len);
        console.log(data);
        Axios.get("https://obscure-lake-21900.herokuapp.com/place/getplace/:" + data)
            .then((res) => {
                console.log(res.data.imageLinksArray);
                this.setState({
                    TittleName: res.data.TittleName,
                    SubTittleName: res.data.subtittleName,
                    city: res.data.city,
                    TourPlace: res.data.PlaceForTour,
                    TourPlaceDescription: res.data.PlaceTourExplaination,
                    id: res.data._id,
                    imageLinksArray: res.data.imageLinksArray.map(data => data)
                })
                console.log(res.data)
            })
            .catch(Err => alert(Err));
    }
    onChangeImageText(event, indexPara) {
        const Data = event.target.value;
        this.setState(prevState => ({
            imageLinksArray: [...prevState.imageLinksArray.map((data, index) => {
                if (index === indexPara) {
                    return Data
                } else {
                    return data
                }
            })]
        }))
        document.getElementById("DisplayImage" + indexPara).src = event.target.value;
    }
   
    OnChangeCity(e) {
        const data = e.target.value;
        this.setState({
            city: data
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
    OnClickSubmitButton() {
        const data = this.state;
        const city = this.state.city;
        const PlaceToTour = this.state.TourPlace;
        const TourPlaceDescription = this.state.TourPlaceDescription;
        const imageLinksArray = this.state.imageLinksArray;
        let count = this.state.imageLinksArray.length;

        const duplicateArray = imageLinksArray.reduce(function (acc, el, i, arr) {
            if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
        }, []);
        const duplicateLength = duplicateArray.length;
        if ( duplicateLength === 0){
            if (count  !== 0) {
                if (city.length > 0 && PlaceToTour.length > 0 && TourPlaceDescription.length > 0) {
                    Axios.post("https://obscure-lake-21900.herokuapp.com/place/update", data)
                        .then(res => {
                            alert(res.data);
                            window.close();
                        })
                        .catch(Err => alert(Err));
                } else {
                    alert("please Fill the data Correctely.");
                }
            } else {
                alert("Please insert The Image links .")
            }
        }else{
            alert("Duplicate image links are present.")
        }

    }
    render() {
        return <>
            <nav class="navbar navbar-light bg-light" style={{ padding: "2%" }}>
                <span class="navbar-brand mb-0 h1">Web Blog</span>
            </nav>
            <div className="container-fluid col-8" style={{ margin: "1% auto 20% auto" }}>
                <form method="POST">
                    <div className="form-group">
                        <label>Subject-name (like tour-travels, cooking etc.)</label>
                        <select name="TittleName" className="form-control" >
                            <option value={this.state.TittleName}>{this.state.TittleName}</option>
                        </select>
                        <label>Sub-title(like tour-travels=Haryana)</label>
                        <select name="state" className="form-control" >
                            <option value={this.state.SubTittleName}>{this.state.SubTittleName}</option>
                        </select>
                        <label>city-name</label>
                        <input onChange={(e) => this.OnChangeCity(e)} type="text" name="city" value={this.state.city} className="form-control" />
                        <label>place-name</label>
                        <input onChange={(e) => this.OnChangeTourPlace(e)} type="text" name="TourPlace" value={this.state.TourPlace} className="form-control" />
                        <label>place-description</label>
                        <textarea onChange={(e) => this.OnChangeTourPlaceDescription(e)} rows="10" name="TourPlaceDescription" value={this.state.TourPlaceDescription} className="form-control" >
                        </textarea>
                        <div style={{ width: "100%"}} class="alert alert-info alert-dismissible fade show" role="alert">
                                <strong>Important : One image link is compulsory.</strong>
                            </div>
                        <div className="row">
                        {

                            this.state.imageLinksArray.map((user, index) => {
                                return (<div className="card" style={{ margin: "2%",width: "46%" }}>
                                        <img src={user} id={"DisplayImage" + index} className="card-img-top" style={{margin:"1%", backgroundPosition: "auto" }}  alt="invalid link" />
                                        <div className="card-body" >
                                            <h4 className="card-title">{index + 1}.image</h4>
                                            <textarea id={"TextImage" + index} rows="5" className="card-text" style={{width:"100%"}} onChange={(e) => this.onChangeImageText(e, index)} value={user} />
                                        </div>
                                </div>)
                            })

                        }
                        </div>
                    </div>
                </form>
                <button style={{ margin: " 1% auto" }} type="button" className="btn btn-primary" onClick={() => this.OnClickSubmitButton()}>Save changes</button>
            </div>
            <div style={{
                position: "fixed",
                left: "0",
                bottom: "0",
                width: "100%",
                height: "10%",
                background: "black",
                color: "white",
                "text-align": "center",
            }} >
                <p style={{ lineHeight: "250%" }}>@Web Blog</p>
            </div>
        </>
    }
}