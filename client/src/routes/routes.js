import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Routes
import Profile from "../components/student/profile";
import TeacherProfile from "../components/teacher/teacherprofile";
import CourseInDetail from "../components/teacher/courseInDetail";
import Login from "../Users/login/login";



function Routes() {
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route>
                            <Route path="/course/:id" component={CourseInDetail} />
                            <Route path="/teacherProfile" component={TeacherProfile} />
                            <Route path="/profile/:id" component={Profile} />
                            {/*<Route path="/" component="#" />*/}
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default Routes;
