import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import Cookie from "js-cookie";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: "",
    };
  }

  render() {
    return (
      <div className="home">
        <div className="menu">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <h1>LNMIIT Course Registration</h1>
        <div className="developers">
          <h2>Developed by:</h2>
          <p className="devP">
            <span>Sumit Arora,</span>
            <span>Aman Bansal,</span>
            <span>Bharat Bansal,</span>
            <span>Shresth Jain,</span>
            <span>Sanskar Pansari</span>
          </p>
        </div>
      </div>
    );
  }
}
