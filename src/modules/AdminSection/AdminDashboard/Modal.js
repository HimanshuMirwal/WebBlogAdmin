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
        Axios.get("http://localhost:5000/place/getplace/:" + data)
            .then((res) => {
                this.setState({
                    TittleName: res.data.TittleName,
                    SubTittleName: res.data.subtittleName,
                    city: res.data.city,
                    TourPlace: res.data.PlaceForTour,
                    TourPlaceDescription: res.data.PlaceTourExplaination,
                    id: res.data._id,
                    imageLinksArray: res.data.imageLinksArray.map(data => data)
                })
            })
            .catch(Err => alert(Err));
    }
    onChangeImageText(event, indexPara) {
        if(event.code !== "Space"){
        const Data= event.target.value;
        console.log()
        if(this.state.imageLinksArray.length < indexPara+1){
            const tempData = this.state.imageLinksArray;
            tempData.push(Data);
            this.setState({
                imageLinksArray:tempData
            })
        }else{
            this.setState(prevState => ({
                imageLinksArray: [...prevState.imageLinksArray.map((data, index) => {
                    if (index === indexPara) {
                        return Data
                    } else {
                        return data
                    }
                })]
            }))
        }
        document.getElementById("DisplayImage" + indexPara).src = event.target.value;
        document.getElementById("StringLength" + indexPara).innerHTML = event.target.value.length;

    }else{
         alert("Please don't use spaces and it has discarded now.")
         document.getElementById("TextImage" + indexPara).value ="";
         document.getElementById("StringLength" + indexPara).innerHTML = event.target.value.length;

     }
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
        const EmptyLinks = imageLinksArray.filter(data => data!=="");
        data.imageLinksArray=EmptyLinks;
        const duplicateArray = EmptyLinks.reduce(function (acc, el, i, arr) {
            if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
        }, []);
        const duplicateLength = duplicateArray.length;
        if( duplicateLength === 0){
            if (count  !== 0) {
                if (PlaceToTour.length > 0 && TourPlaceDescription.length > 0) {
                    Axios.post("http://localhost:5000/place/update", data)
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
            alert("Duplicate or empty image links are present.")
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
                        <input  placeholder="optional, you ca use blank spaces instead of words" onChange={(e) => this.OnChangeCity(e)} type="text" name="city" value={this.state.city} className="form-control" />
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
                            
                            Array.apply(1, Array(6)).map((user, index) => {
                               const CurrentData  =  this.state.imageLinksArray[index];
                                if(CurrentData){
                                     return (<div className="card" style={{ margin: "2%",width: "46%" }}>
                                        <img src={CurrentData} id={"DisplayImage" + index} className="card-img-top" style={{margin:"1%", backgroundPosition: "auto" }}  alt="invalid link" />
                                        <span id={"StringLength" + index}>{CurrentData.length}</span>
                                        <div className="card-body" >
                                            <h4 className="card-title">{index + 1}.image</h4>
                                            <textarea id={"TextImage" + index} rows="5" className="card-text" style={{width:"100%"}} onChange={(e) => this.onChangeImageText(e, index)} onKeyPress={(e) => this.onChangeImageText(e, index)} value={CurrentData} />
                                        </div>
                                </div>) 
                                }else{
                                    return (<div className="card" style={{ margin: "2%",width: "46%" }}>
                                        <img src="" id={"DisplayImage" + index} className="card-img-top" style={{margin:"1%", backgroundPosition: "auto" }}  alt="invalid link" />
                                        <span id={"StringLength" + index}></span>
                                        <div className="card-body" >
                                            <h4 className="card-title">{index + 1}.image</h4>
                                            <textarea id={"TextImage" + index} rows="5" className="card-text" style={{width:"100%"}} onChange={(e) => this.onChangeImageText(e, index)} onKeyPress={(e) => this.onChangeImageText(e, index)}  />
                                        </div>
                                </div>) 
                                }
                                
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