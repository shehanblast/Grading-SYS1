import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";

//Common
// import Footer from "../Common/footer/footer";
// import Header from "../Common/Header/header";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            num : 0,
            student :''
        }

    }

    componentDidMount() {

        const id = "6000bee82139343998bafac5";

        // axios.get(`http://localhost:5001/users/${id}`)
        //     .then(response => {
        //         this.setState({ student: response.data });
        //         console.log(response);
        //     })


        axios.get(`http://localhost:5001/subjects/${id}`)
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
                {/*<Header/>*/}
                <div>
                    <br/>
                    <div className="container emp">
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
                                <tr>
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
                {/*<Footer/>*/}
            </>
        )
    }
}

export default Profile;


