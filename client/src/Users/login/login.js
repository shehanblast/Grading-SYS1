import React, { useState} from 'react';
import { LoadUserOther, LoginUser} from "../../Actions/Authentication";
import {connect} from 'react-redux';
import swat from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Validation
import {isEmail, isEmpty, isLength} from "../../Utils/validations";

//Css
import './login.css'

//Common
import Header from "../../components/Common/Header/header";
import Footer from "../../components/Common/footer/footer";

const Login = ({loginUser, isLoggedIn}) => {

    let [data, setData] = useState({
        email: '',
        password: ''
    });

    let [user, setUser] = useState({
        position: '',
        userId:''
    });

    let {email, password} = data;
    const Clear =()=>{
        useState({
            email: '',
            password:''
        })
    }
    if (isLoggedIn) {
        LoadUserOther().then((res) => {
            setUser({
                position: res.data.position,
                userId: res.data._id
            })
            if (!localStorage.getItem('userPosition')) {
                localStorage.setItem('userPosition',res.data.position);
            }
        });

        switch (user.position) {
            case 'employee':
                if (!localStorage.getItem('userPosition')) {
                    localStorage.setItem('userPosition', user.position);
                }
                return window.location.replace('/teacherProfile')
            case 'user':
                if (!localStorage.getItem('userPosition')) {
                    localStorage.setItem('userPosition', user.position);
                }
                return window.location.replace('profile/${userId}')
            default:
        }
    }
    const fieldmissAlart = (res) => {
        swat.fire({
            icon: 'error',
            title: 'OOps! something missing',
            text: res,
        })
    }
    const onChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    };
    const submitData = (event) => {

        event.preventDefault();

        if (email === "" || password === "") {
            fieldmissAlart();
        }
        if (isEmpty(email) || isEmpty(password)) {
            let message="Fields are Empty"
            fieldmissAlart(message);
        } else if (isLength(password)) {
            let message="At least 8 Characters"
            fieldmissAlart(message);
        } else if (!isEmail(email)) {
            let message = "Invalid Email"
            fieldmissAlart(message);
        }else {
            loginUser(email, password);
        }
    }
    return (
        <>
            <Header/>
        <div className="Login">
            <Form onSubmit={(event) => submitData(event)}>
                <h3 className="login_title">LOGIN</h3>
                <Form.Group size="lg" controlId="email" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email@gamil.com"
                        onChange={(e) => onChange(e)}
                        value={email}
                        name="email"
                        required/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        className="form-control"
                        id="user_password"
                        placeholder="Password"
                        onChange={(e) => onChange(e)}
                        value={password}
                        name="password"
                        required/>
                </Form.Group>
               <br/>
                <button type="submit" className="login_button btn btn-primary">
                    LOGIN
                </button>
            </Form>
        </div>
        <Footer/>
    </>
    );
}
const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, {loginUser: LoginUser})(Login);