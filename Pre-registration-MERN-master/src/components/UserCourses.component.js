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
      "http://localhost:5000/courses?page=" +
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
        "http://localhost:5000/users/setUserCourses?token=" +
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
          <div class="prevNext">
            <button>P</button>
            <button>N</button>
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
                  1. semester: 2017/2018 Fall
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
                <td>Introduction to Programming</td>
                <td>3 | 6</td>
                <td>B+</td>
              </tr>
              <tr>
                <td>ELIT100</td>
                <td>Academic English and Effective Communication</td>
                <td>3 | 6</td>
                <td>A-</td>
              </tr>
              <tr>
                <td>MATH101</td>
                <td>Calculus I</td>
                <td>3 | 6</td>
                <td>B-</td>
              </tr>
              <tr>
                <td>Course Code</td>
                <td>Understanding Science and Technology</td>
                <td>1.5 | 3</td>
                <td>A</td>
              </tr>
              <tr>
                <td>Course Code</td>
                <td>Introduction to Psychology</td>
                <td>3 | 6</td>
                <td>C+</td>
              </tr>
              <tr>
                <td>TURK111</td>
                <td>Spoken Turkish I</td>
                <td>1.5 | 3</td>
                <td>A</td>
              </tr>
            </tbody>
          </table>
          <table class="semester">
            <thead>
              <tr>
                <th class="semesterNum" colspan="4">
                  2. semester: 2017/2018 Spring
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
                <td>Introduction to Programming</td>
                <td>3 | 6</td>
                <td>B+</td>
              </tr>
              <tr>
                <td>ELIT100</td>
                <td>Academic English and Effective Communication</td>
                <td>3 | 6</td>
                <td>A-</td>
              </tr>
              <tr>
                <td>MATH101</td>
                <td>Calculus I</td>
                <td>3 | 6</td>
                <td>B-</td>
              </tr>
              <tr>
                <td>Course Code</td>
                <td>Understanding Science and Technology</td>
                <td>1.5 | 3</td>
                <td>A</td>
              </tr>
              <tr>
                <td>Course Code</td>
                <td>Introduction to Psychology</td>
                <td>3 | 6</td>
                <td>C+</td>
              </tr>
              <tr>
                <td>TURK111</td>
                <td>Spoken Turkish I</td>
                <td>1.5 | 3</td>
                <td>A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
