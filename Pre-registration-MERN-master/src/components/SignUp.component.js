import React, { Component } from "react";
import axios from "axios";
import Logo from "../img/IUSlogo2.png";
import { Link } from "react-router-dom";
import "../css/style.css";
import "../css/main.css";
import "../css/util.css";
import "../fonts/iconic/css/material-design-iconic-font.min.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      userID: "",
      password: "",
      ConfirmPassword: "",
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

  onChangeConfirmPassword(e) {
    this.setState({
      ConfirmPassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.ConfirmPassword !== this.state.password) {
      alert("Error");
      window.location = "/signup";
      return;
    }

    const newUser = {
      userID: this.state.userID,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/users/signup", newUser)
      .then((res) => {
        console.log("Success");
        window.location = "/";
      })
      .catch((err) => alert("Error: " + err));

    //window.location = "/"; don't refresh the page before the request is finish....
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

              <span className="login100-form-title p-b-34 p-t-27">
                Register
              </span>

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

              <div
                className="wrap-input100 validate-input"
                data-validate="Confirm password"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  onChange={this.onChangeConfirmPassword}
                  placeholder="Confirm password"
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
                <button className="login100-form-btn">Signup</button>
              </div>

              <div className="text-center p-t-90">
                <Link className="txt1" to="/">
                  Have an account!? Log in now!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
