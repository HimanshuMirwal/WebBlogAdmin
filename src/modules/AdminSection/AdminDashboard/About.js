import React from "react";
import Axios from "axios";
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            About: '',
            ID: '',
            image: '',
            DivWarn: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-warning alert-dismissible fade show" role="alert"><strong>I think there is a problem.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivForm: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please, Fill Form correctly.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            DivSuccessUpdate: '<div style="width:50%;position:fixed;right:5%;bottom:5%" class="alert alert-success alert-dismissible fade show" role="alert"><strong>Updated Successfully.</strong><button type="button" style="background:none;border:none;color:#0f5132;float:right" id="PasswordChangeAlert"  class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
        }
        this.changeAbout = this.changeAbout.bind(this);
        this.OnSubmit = this.OnSubmit.bind(this);
        this.changeAboutImage = this.changeAboutImage.bind(this);
    }
    componentDidMount() {
        Axios.get("http://localhost:5000/About/getabout")
            .then(res => this.setState({
                About: res.data.about,
                ID: res.data._id,
                image: res.data.image
            }))
            .catch(err => alert("Error " + err))
    }

    changeAbout(e) {
        const data = e.target.value;
        this.setState({
            About: data
        })
    }
    OnSubmit() {
        const len = this.state.About.length;
        if (len > 0) {
            Axios.post("http://localhost:5000/About/postabout", { ID: this.state.ID, About: this.state.About, image: this.state.image })
                .then(res => {
                    console.log(res.data)
                    document.getElementById("AboutDisplay").innerHTML=this.state.DivSuccessUpdate;
                })
                .catch(err => {
                    console.log("Error " + err)
                    document.getElementById("AboutDisplay").innerHTML=this.state.DivWarn;
                })
        }else{
            document.getElementById("AboutDisplay").innerHTML=this.state.DivForm;
        }
    }
    changeAboutImage(e) {
        const data = e.target.value;
        this.setState({
            image: data
        })
    }
    render() {
        return (
            <div className="container-fluid" style={{ padding: "2% 5%" }}>
            <div id="AboutDisplay">

            </div>
            
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="2">
                                <h1>About</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col" colSpan="2">
                                <textarea value={this.state.About} onChange={(e) => this.changeAbout(e)} rows="10" style={{ marginBottom: "2%" }} className="form-control">

                                </textarea>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">
                                <textarea value={this.state.image} cols="60" rows="8" onChange={(e) => this.changeAboutImage(e)} style={{ marginBottom: "2%" }} className="form-control" >
                                </textarea>
                            </th>
                            <th scope="col">
                                <img style={{ height: "200px", width: "350px", float: "right" }} src={this.state.image} className="form-control" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan="2">
                                <button onClick={() => this.OnSubmit()} class="form-control btn btn-info" >
                                    Update
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default About;