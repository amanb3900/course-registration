import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import Magnifier from "../img/magnifier.png";

export default class UserCoursesCurrect extends Component {
  constructor(props) {
    super(props);

    this.updateTable = this.updateTable.bind(this);
    //this.onChangeCourses = this.onChangeCourses.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      data: [],
      course: "",
      userId: Cookie.get("userId"),
    };
  }

  //Right before anything load the page this is called
  async componentDidMount() {
    await this.updateTable();
    console.log(this.state.data);
  }

  async updateTable() {
    axios
      .get(
        "http://localhost:5000/users/userCourse?token=" +
          Cookie.get("token") +
          "&userId=" +
          Cookie.get("userId")
      )
      .then((res) => {
        this.setState({
          data: res.data[0].information,
        });
      })
      .catch((err) => alert("Error: " + err));
  }

  onDelete(e) {
    console.log("Deleting courseId: " + e);
    axios
      .post(
        "http://localhost:5000/users/removeCourse?courseId=" +
          e +
          "&token=" +
          Cookie.get("token") +
          "&userId=" +
          Cookie.get("userId")
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error during deletion... see console " + err);
      });
  }

  render() {
    return (
      <div className="myCourses">
        <div className="menu">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="upperNav">
          <div className="search">
            <form className="searchForm">
              <input type="search" name="search" placeholder="Search" />
            </form>
            <button className="magnifier">
              <img src={Magnifier} className="manifierImg" />
            </button>
          </div>
          <div className="prevNext">
            <button>P</button>
            <button>N</button>
          </div>
        </div>
        <div className="downNav">
          <div className="passedCurrent">
            <Link id="passedC" to="/UserCourses">
              Passed courses
            </Link>
            <a id="currentC">Current courses</a>
          </div>
        </div>
        <div className="passedCourses">
          <table className="semester">
            <thead>
              <tr>
                <th className="semesterNum" colSpan="6">
                  Taken Courses
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="info">
                <td>Course Code</td>
                <td>Course Name</td>
                <td>Pofessor</td>
                <td>Academic Unit</td>
                <td>Pre req</td>
                <td>Options</td>
              </tr>
              {Array.isArray(this.state.data) &&
                this.state.data.map((item, i) => {
                  return (
                    <tr key={i}>
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
                        {console.log(item)}
                        {/* {item.prerequisite.map((item) => {
                          return item + " ";
                        })} */}
                      </td>
                      <td>
                        <div className="button">
                          <button
                            className="courseBtn"
                            onClick={() => this.onDelete(item._id)}
                          >
                            Remove Course
                          </button>
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
