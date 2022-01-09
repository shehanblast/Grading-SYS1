import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";

//Common
// import Footer from "../Common/footer/footer";
// import Header from "../Common/Header/header";

const SubmissionAlert1 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionAlert2 = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Paper Rejected!',
        showConfirmButton: false,
        timer: 3000
    });
}

class TeacherProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            num : 0
        }

    }

    componentDidMount() {

        axios.get(`http://localhost:5001/courses/`)
            .then(response => {
                this.setState({ profile: response.data.data });
                console.log(response);
            })

        // axios.get('http://localhost:5001/subjects/')
        //     .then(response => {
        //         this.setState({ profile: response.data });
        //         console.log(response);
        //     })

    }

    navigateCourseInDetail(e, Id) {
        window.location = `/course/${Id}`
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
                    <div className="container">
                        <div className="alert btn-dark" role="alert">
                            <h2>Courses</h2>
                        </div>
                            {this.state.profile.length > 0 && this.state.profile.map((item, index) => (
                                <div className="card" onClick={e => this.navigateCourseInDetail(e,item._id)}>
                                    <h3 className="card-title">{item.name}</h3>
                                </div>
                            ))}


                    </div>
                </div>
                {/*<Footer/>*/}
            </>
        )
    }
}

export default TeacherProfile;


