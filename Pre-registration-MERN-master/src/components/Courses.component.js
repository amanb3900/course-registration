import React, { Component } from "react";
import "../css/style.css";
import axios from "axios";
import Cookie from "js-cookie";
import Magnifier from "../img/magnifier.png";

export default class Courses extends Component {
  constructor(props) {
    super(props);

    this.updateTable = this.updateTable.bind(this);
    //this.onChangeCourses = this.onChangeCourses.bind(this);

    this.onAddItem = this.onAddItem.bind(this);
    //this.changeLooks = this.changeLooks.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getCurrentUserCourse = this.getCurrentUserCourse.bind(this);

    this.state = {
      default: [], //We save the course to avoid to requery them each time.
      userCourse: [],
      data: [],
      page: 1,
      courseId: [],
      //course: "",
      userId: "",
      courseID: "",

      //search
      search: "",
    };
  }

  //Right before anything load the page this is called
  async componentDidMount() {
    this.getCurrentUserCourse();
    await this.updateTable();
  }

  getCurrentUserCourse() {
    axios
      .get(
        "http://localhost:5000/users/userCourse?token=" +
          Cookie.get("token") +
          "&userId=" +
          Cookie.get("userId")
      )
      .then((res) => {
        this.setState({
          userCourse: res.data[0].courses,
        });
      })
      .catch((err) => alert("Error: " + err));
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
      default: res.array,
    });
  }

  /*  onChangeCourse = (event) => {
    this.setState({ course: event.target.value });
  }; */

  async onAddItem(course) {
    console.log("onAddItem stuff");
    console.log(course);
    axios
      .post(
        "http://localhost:5000/users/addCourse?token=" +
          Cookie.get("token") +
          "&userId=" +
          Cookie.get("userId"),
        { courseId: course }
      )
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => alert("Error: " + err));
  }

  // Search impelmentation
  onSearch(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
    console.log(e.target.value);

    if (e.target.value === 0) {
      this.setState({
        data: this.state.default,
      });
      return;
    } else if (e.target.value.length < 3) return;

    axios
      .get(
        "http://localhost:5000/courses/search?value=" +
          e.target.value +
          "&token=" +
          Cookie.get("token") +
          "&userId=" +
          Cookie.get("userId")
      )
      .then((res) => {
        console.log(res.data);

        this.setState({ data: res.data });
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }

  /*  changeLooks(e) {
    var btn = document.querySelector(".downBtn");
    btn.style.background = "#292626";
  } */

  render() {
    return (
      <div className="addCourses">
        <div className="menu">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="upperNav">
          <div className="search">
            <form className="searchForm">
              <input
                type="search"
                name="search"
                placeholder="Search"
                onChange={this.onSearch}
                value={this.state.search}
              />
            </form>
            <button className="magnifier">
              <img src={Magnifier} className="manifierImg" />
            </button>
          </div>
          <div className="prevNext">
            <button> P </button>
            <button> N </button>
          </div>
        </div>
        <div className="addCoursesDownNav">
          <div className="typeOfCourses">
            <a className="blueBorder" href="addCourses.html">
              All courses
            </a>
            <a href="mandatoryCourses.html">Mandatory courses</a>
            <a href="electiveCourses.html">Elective courses</a>
          </div>
        </div>
        <div className="allCourses" id="allCourses">
          <table className="courses">
            <tbody>
              <tr>
                <th className="semesterNum" colspan="6">
                  All courses
                </th>
              </tr>
              <tr className="info">
                <td>Course Code</td>
                <td>Course Name</td>
                <td>Professor</td>
                <td>Faculty</td>
                <td>Prerequisites</td>
                <td>Option</td>
              </tr>
              {this.state.data.map((item, i) => {
                return (
                  <tr
                    key={i}
                    style={
                      this.state.userCourse.includes(item._id) > 0
                        ? { display: "none" }
                        : { background: "#353131" }
                    }
                  >
                    <td className="title">{item.course_id}</td>
                    <td>
                      <a
                        className="ecampus"
                        href={"https://ecampus.ius.edu.ba/" + item.Url}
                      >
                        {item.course_name}
                      </a>
                    </td>
                    <td>{item.Lecturer}</td>
                    <td>{item.AcademicUnit}</td>
                    <td>
                      {item.prerequisite.map((item) => {
                        return item + " ";
                      })}
                    </td>
                    <td>
                      <div className="button">
                        <form>
                          <button
                            id="work"
                            className="courseBtn"
                            onClick={() => this.onAddItem(item._id)}
                          >
                            Add Course
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
