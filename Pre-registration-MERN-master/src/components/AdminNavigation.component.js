import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import Logo from "../img/IUSlogo2.png";
import Cookie from "js-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";

const btnStyle = {
  margin: "5px",
};

export default class AdminNavigation extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    this.state = {
      isLogin: false,
      fullName: "",
      redirect: null,
    };
  }

  async componentDidMount() {
    /*Check if the user is properly authenticated*/
    if (!Cookie.get("token")) {
      window.location = "/";
    }

    const response = await fetch(
      "http://localhost:5000/users/auth?token=" +
        Cookie.get("token") +
        "&userId=" +
        Cookie.get("userId")
    );
    this.setState({
      fullName: Cookie.get("name") + " " + Cookie.get("surname"),
    });
  }

  logout(e) {
    e.preventDefault();
    axios
      .get(
        "http://localhost:5000/users/logout?token=" +
          Cookie.get("token") +
          "&userId=" +
          Cookie.get("userId")
      )
      .then((res) => {
        Cookie.remove("token");
        Cookie.remove("userId");
        this.setState({
          redirect: "/",
        });
      })
      .catch((err) => {
        /*alert("Error: " + err);*/ //Very strange beacause we considere it has an error but it is not...
        Cookie.remove("token");
        Cookie.remove("userId");
        console.log("didnt log out");
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <nav className="navigation">
        <div className="logo">
          <img className="ius" src={Logo} />
          <span className="user">Administrator</span>
        </div>
        <div className="upButtons">
          <div className="links">
            <Link id="home" to="/AdminHome">
              <span data-hover="Home">Home</span>
            </Link>
            <Link id="MyCourses" to="/AdminCourses">
              <span data-hover="MyCourses">Courses</span>
            </Link>
            <Link id="AddCourses" to="/AdminStudents">
              <span data-hover="AddCourses">Students</span>
            </Link>
            <Link id="Schedule" to="/AdminStatistics">
              <span data-hover="Schedule">Statistics</span>
            </Link>
          </div>
        </div>
        <div className="downButtons">
          <div className="links">
            <form className="LogOut">
              <button onClick={this.logout} data-hover="LogOut">
                Log Out
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
