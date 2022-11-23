import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/style.css";

import Navigation from "./components/navbar.component";
import Login from "./components/Login.component";
import SignUp from "./components/SignUp.component";
import Courses from "./components/Courses.component";
import UserCourses from "./components/UserCourses.component";
import UserCoursesCurrent from "./components/UserCoursesCurrent.component";
import Home from "./components/Home.component";
import Schedule from "./components/Schedule.component";

import AdminHome from "./components/AdminHome.component";
import AdminCourses from "./components/AdminCourses.component";
import AdminStudents from "./components/AdminStudents.component";
import AdminStatistics from "./components/AdminStatistics.component";
import AdminStatisticsEx from "./components/AdminStatisticsEx.component";
import AdminNavigation from "./components/AdminNavigation.component";

function App() {
  return (
    <div className="outerWrapper">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/SignUp">
          <SignUp />
        </Route>
        <div className="wrapper">
          <Route exact path="/Home">
            <Navigation />
            <Home />
          </Route>
          <Route exact path="/Courses">
            <Navigation />
            <Courses />
          </Route>
          <Route exact path="/UserCourses">
            <Navigation />
            <UserCourses />
          </Route>
          <Route exact path="/UserCoursesCurrent">
            <Navigation />
            <UserCoursesCurrent />
          </Route>
          <Route exact path="/Schedule">
            <Navigation />
            <Schedule />
          </Route>

          <Route exact path="/AdminHome">
            <AdminNavigation />
            <AdminHome />
          </Route>
          <Route exact path="/AdminCourses">
            <AdminNavigation />
            <AdminCourses />
          </Route>
          <Route exact path="/AdminStudents">
            <AdminNavigation />
            <AdminStudents />
          </Route>
          <Route exact path="/AdminStatistics">
            <AdminNavigation />
            <AdminStatistics />
          </Route>
          <Route exact path="/AdminStatisticsEx">
            <AdminNavigation />
            <AdminStatisticsEx />
          </Route>
        </div>
      </Switch>
    </div>
  );
}

export default App;
