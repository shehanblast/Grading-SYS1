import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";

//Common
// import Footer from "../Common/footer/footer";
// import Header from "../Common/Header/header";

class CourseInDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: [],
            num : 0,
            name: '',
            code:'',
            lecturer:''
        }

    }

    componentDidMount() {

        console.log(this.props.match.params.id)

        axios.get(`http://localhost:5001/courses/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ course: response.data.subjects });
                console.log(response);
            })

        axios.get(`http://localhost:5001/courses/course/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    name: response.data.data.name,
                    code: response.data.data.code,
                    lecturer: response.data.data.lecture
                });
                console.log(response);
                console.log(this.state.name);
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

                        <div>
                            <h5>Course Code: {this.state.code}</h5>
                            <h5>Course Name: {this.state.name}</h5>
                            <h5>lecturer in charge: {this.state.lecturer}</h5>
                        </div>
                        <div className="alert btn-dark" role="alert" style={{textAlign:"center"}}>
                            <h2>Subjects</h2>
                        </div>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                            <tr className="table-dark" style={{textAlign:"center"}}>
                                <th scope="col">Number</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Grade</th>
                                <th scope="col">CA marks</th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.state.course.length > 0 && this.state.course.map((item, index) => (
                                <tr style={{textAlign:"center"}}>
                                    <th scope="row">{++this.state.num}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.marks}</td>
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

export default CourseInDetail;


