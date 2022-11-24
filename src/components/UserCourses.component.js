import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import Magnifier from "../img/magnifier.png";

export default class UserCourses extends Component {
  constructor(props) {
    super(props);

    this.updateTable = this.updateTable.bind(this);
    //this.onChangeCourses = this.onChangeCourses.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddItem = this.onAddItem.bind(this);

    this.state = {
      data: [],
      page: 1,
      courses: [],
      //course: "",
      userId: "",
    };
  }

  //Right before anything load the page this is called
  async componentDidMount() {
    await this.updateTable();
  }

  async updateTable() {
    const response = await fetch(
      "http://localhost:5500/courses?page=" +
        this.state.page +
        "&token=" +
        Cookie.get("token") +
        "&userId=" +
        Cookie.get("userId")
    );
    const res = await response.json();

    this.setState({
      data: res.array,
    });
  }

  /*  onChangeCourse = (event) => {
    this.setState({ course: event.target.value });
  }; */

  onAddItem(course) {
    this.setState((state) => {
      const courses = [...state.courses, course];
      return {
        courses,
      };
    });
  }

  /*  onChangeCourses(e) {
    this.state.courses.push(e);
  } */

  onSubmit(e) {
    e.preventDefault();
    const added = {
      userId: Cookie.get("userId"),
      courses: this.state.courses,
    };
    axios
      .post(
        "http://localhost:5500/users/setUserCourses?token=" +
          Cookie.get("token") +
          "&userId=" +
          Cookie.get("userId"),
        added
      )
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => alert("Error: " + err));
  }

  render() {
    return (
      <div class="myCourses">
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
          
        </div>
        <div class="downNav">
          <div class="passedCurrent">
            <a id="passedC">Passed courses</a>
            <Link id="currentC" to="/UserCoursesCurrent">
              Current courses
            </Link>
          </div>
        </div>
        <div class="passedCourses">
          <table class="semester">
            <thead>
              <tr>
                <th class="semesterNum" colspan="4">
                  1. Semester : 2020-2021 (1ST SEM)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="info">
                <td>Course Code</td>
                <td>Course Name</td>
                <td>Credit</td>
                <td>Letter Final Grade</td>
              </tr>
              <tr>
                <td>CS103</td>
                <td>Computer Programming</td>
                <td>3</td>
                <td>B</td>
              </tr>
              <tr>
                <td>HSS 228</td>
                <td>TCE</td>
                <td>3</td>
                <td>AB</td>
              </tr>
              <tr>
                <td>MATH101</td>
                <td>M-1</td>
                <td>4</td>
                <td>BC</td>
              </tr>
              <tr>
                <td>MECH 110</td>
                <td>CLP</td>
                <td>4</td>
                <td>C</td>
              </tr>
              <tr>
                <td>MECH</td>
                <td>CLP LAB</td>
                <td>2</td>
                <td>BC</td>
              </tr>
              <tr>
                <td>ECE 101</td>
                <td>BASIC ELECTRONICS</td>
                <td>4</td>
                <td>B</td>
              </tr>
            </tbody>
          </table>
          <table class="semester">
            <thead>
              <tr>
                <th class="semesterNum" colspan="4">
                  2. Semester : 2020-2021 (2ND SEM)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="info">
                <td>Course Code</td>
                <td>Course Name</td>
                <td>Credit</td>
                <td>Letter Final Grade</td>
              </tr>
              <tr>
                <td>CS103</td>
                <td>IDSA</td>
                <td>3</td>
                <td>B</td>
              </tr>
              <tr>
                <td>CS103</td>
                <td>DSA LAB</td>
                <td>1</td>
                <td>BC</td>
              </tr>
              <tr>
                <td>MATH101</td>
                <td>M-2</td>
                <td>4</td>
                <td>BC</td>
              </tr>
              <tr>
                <td>ECE </td>
                <td>DSY</td>
                <td>3</td>
                <td>C</td>
              </tr>
              <tr>
                <td>HSS</td>
                <td>VEE</td>
                <td>3</td>
                <td>BC</td>
              </tr>
              <tr>
                <td>CSE</td>
                <td>OTA</td>
                <td>3</td>
                <td>A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
