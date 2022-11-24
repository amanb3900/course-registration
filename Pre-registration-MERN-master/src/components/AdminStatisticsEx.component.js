import React, { Component } from "react";
import "../css/style.css";
import Magnifier from "../img/magnifier.png";

export default class AdminStatisticsEx extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="addCourses">
        <div class="menu">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <div class="upperNav">
          <div class="search">
            <form class="searchForm">
              <input type="search" name="search" placeholder="Search" />
            </form>
            <button class="magnifier">
              <img src={Magnifier} className="manifierImg" />
            </button>
          </div>
          <div class="prevNext"></div>
        </div>
        <div class="addCoursesDownNav">
          <div class="typeOfCourses">
            <a class="blueBorder" id="marginZero" href="addCourses.html">
              Statistics
            </a>
          </div>
        </div>
        <div class="StatisticsEx">
          <div class="courseDetails">
            <div class="info">
              <div class="innerInfo">
                <div class="data">
                  <span class="subject">
                    Total number of students registered:{" "}
                  </span>
                  <span class="number">55</span>
                </div>
                <div class="data">
                  <span class="subject">
                    Students which choose it as a second option:{" "}
                  </span>
                  <span class="number">20</span>
                </div>
                <div class="data">
                  <span class="subject">CSE: </span>
                  <span class="number">15</span>
                </div>
                <div class="data">
                  <span class="subject">SE: </span>
                  <span class="number">35</span>
                </div>
                <div class="data">
                  <span class="subject">EE: </span>
                  <span class="number">5</span>
                </div>
              </div>
            </div>
            <div class="description">
              <h2>CS308 Software Engineering</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
