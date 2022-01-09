import React, { Component} from 'react';
import axios from 'axios';

//Common
import Footer from "../Common/footer/footer";
import Header from "../Common/Header/header";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            num : 0,
            studentName :'',
            studentEmail :'',
            studentAddress :'',
            studentImage:''
        }

    }

    componentDidMount() {

        const idd ="61da98cab73fc92c0892c8a6";

        axios.get(`http://localhost:5001/users/${idd}`)
            .then(response => {
                this.setState({
                    studentName: response.data.data.firstName,
                    studentEmail: response.data.data.email,
                    studentAddress: response.data.data.address,
                    studentImage: response.data.data.imageUrl
                });
                console.log(response);
            })


        axios.get(`http://localhost:5001/subjects/${idd}`)
            .then(response => {
                this.setState({ profile: response.data.data });
                console.log(response);
            })



    }

    navigateStoreItem(e, Id) {
        window.location = `/storeItem/${Id}`
        console.log(Id);
    }

    // handleChange = event => {
    //     this.setState({ filter: event.target.value });
    // };


    render() {
        return (
            <>
                <Header/>
                <div>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-11">
                                <h6>Student Name:        {this.state.studentName}</h6>
                                <h6>Email:        {this.state.studentEmail}</h6>
                                <h6>Address: {this.state.studentAddress}</h6>
                            </div>
                            <div className="col-md-1 text-right">
                                <img src={this.state.studentImage} width="100%"/>
                            </div>
                        </div>
                        <br/>
                        <div className="alert btn-dark" role="alert">
                            <h2>Student Profile</h2>
                        </div>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                            <tr className="table-dark" style={{textAlign:"center"}}>
                                <th scope="col">Number</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Grade</th>
                                <th scope="col">CA marks</th>
                                <th scope="col">Reviews</th>
                                <th scope="col">Reviews</th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.state.profile.length > 0 && this.state.profile.map((item, index) => (
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">{++this.state.num}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.marks}</td>
                                    <td>{item.reviews}</td>
                                    <td >
                                        <button className="btn btn-warning"  > <i className="fas fa-edit">&nbsp;</i>Edit</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Profile;


