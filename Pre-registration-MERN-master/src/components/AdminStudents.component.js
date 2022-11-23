import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import Cookie from "js-cookie";
import "../css/style.css";
import Magnifier from "../img/magnifier.png";

export default class AdminStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userId: "",
      course: "",
      registered: "false",
      userId: Cookie.get("userId"),
    };
  }

  async componentDidMount() {
    await this.updateTable();
  }

  async updateTable() {
    axios
      .get("http://localhost:5000/debug/users")
      .then((res) => {
        this.setState({
          data: res.data,
        });
        console.log(this.state.data);
      })
      .catch((err) => alert("Error: " + err));
  }

  onDelete(_id) {
    console.log("Deleting tarik: " + _id);
    axios
      .post("http://localhost:5000/debug/delete", { _id: _id })
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
              All Students
            </a>
          </div>
        </div>
        <div class="allCourses" id="allCourses">
          <table class="courses">
            <tbody>
              <tr class="info">
                <td>ID</td>
                <td>Student Name</td>
                <td>Program</td>
                <td>Semester</td>
                <td>Registered</td>
                <td>Delete</td>
                <td>Edit</td>
              </tr>
              {Array.isArray(this.state.data) &&
                this.state.data.map((item, i) => {
                  if (!item.isAdmin) {
                    if (item.password) {
                      this.state.registered = "true";
                    }
                    return (
                      <tr key={i}>
                        <td className="title">{item.userID}</td>
                        <td>
                          {item.name} {item.surname}
                        </td>
                        <td>{item.faculty}</td>
                        <td>{item.semester}</td>
                        <td>{this.state.registered}</td>
                        <td>
                          <div className="button">
                            <button
                              onClick={() => this.onDelete(item._id)}
                              className="courseBtn"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="button">
                            <button className="courseBtn">Edit</button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
