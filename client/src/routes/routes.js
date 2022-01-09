import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Routes
import Profile from "../components/student/profile";
import TeacherProfile from "../components/teacher/teacherprofile";
// import EditStore from "../Components/Employee/editStore"
// import CustomerViewStore from "../Components/Views/customerViewStore"
//
// //User
// import {Provider} from "react-redux";
// import store from "../Store";
// import Login from "../Users/login/login";
// import Register from "../Users/register/register";
// import ConfirmEmail from "../Actions/confirmEmail";


function Routes() {
    return (
        <div>
            {/*<Provider store={store}>*/}
                <Router>
                    <Switch>
                        <Route>
                            {/*<Route path="/createStore" component={CreateStore} />*/}
                            {/*<Route path="/viewStore" component={CustomerViewStore} />*/}
                            <Route path="/teacherProfile/:id" component={TeacherProfile} />
                            <Route path="/profile/:id" component={Profile} />
                            {/*<Route path="/" component="#" />*/}
                        </Route>
                    </Switch>
                </Router>
            {/*</Provider>*/}
        </div>
    );
}

export default Routes;
