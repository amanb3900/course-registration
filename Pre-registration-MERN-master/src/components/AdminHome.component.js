import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="home">
        <div class="menu">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <h1>IUS Pre-Registration system</h1>
        <div class="developers">
          <h2>Developed by:</h2>
          <p class="devP">
            <span>Adem Dugalić,</span>
            <span>Axel Stefanini,</span>
            <span>Lejla Mujakić,</span>
            <span>Tarik Muharem,</span>
            <span>Zinedin Hadžajlija</span>
          </p>
        </div>
      </div>
    );
  }
}
