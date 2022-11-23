import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../img/IUSlogo2.png";
import Cookie from "js-cookie";
import "../css/style.css";
import "../css/main.css";
import "../css/util.css";
import "../fonts/iconic/css/material-design-iconic-font.min.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isLogin = this.isLogin.bind(this);

    this.state = {
      userID: "",
      password: "",
      isAdmin: false,
    };
  }

  onChangeID(e) {
    this.setState({
      userID: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      userID: this.state.userID,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/users/login", user)
      .then((res) => {
        console.log(res.data);
        Cookie.set("token", res.data.token);
        Cookie.set("userId", res.data.userId);
        Cookie.set("name", res.data.name);
        Cookie.set("surname", res.data.surname);

        this.setState({
          isAdmin: res.data.isAdmin,
        });
        if (this.state.isAdmin) {
          //needs testing
          window.location = "/AdminHome";
        } else {
          //Return to the user list
          window.location = "/Home";
        }
      })
      .catch((err) => {
        
        Cookie.remove("token");
        Cookie.remove("userId");

        alert("Error: " + err);
        //Return to the user list
        //window.location = "/";
      });
  }

  isLogin() {
    if (!Cookie.get("token")) return false;
    else return Cookie.get("token") !== "" && Cookie.get("userId") !== "";
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              onSubmit={this.onSubmit}
              className="login100-form validate-form"
            >
              <span className="login100-form-logo">
                <img className="img" src={Logo} />
              </span>

              <span className="login100-form-title p-b-34 p-t-27">Log in</span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter ID"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  onChange={this.onChangeID}
                  placeholder="ID"
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xf207;"
                ></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  onChange={this.onChangePassword}
                  placeholder="Password"
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xf191;"
                ></span>
              </div>

              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                />
                <label
                  className="label-checkbox100" //for="ckb1"
                >
                  Remember me
                </label>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Login</button>
              </div>

              <div className="text-center p-t-90">
                <Link className="txt1" to="/SignUp">
                  Don't have an account!? Register!
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div id="dropDownSelect1"></div>
      </div>
    );
  }
}
