import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import Cookie from "js-cookie";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="schedule">
        <div class="menu">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <div class="gridSchedule">
          <div class="deck">
            <div class="card">
              <div class="day">Monday</div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  SE308.1 Communication Systems and Networks
                  <br />A F2.3
                </div>
                <div class="event-time">9:00 to 10:50</div>
              </div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  CS310.1 Human Computer Interaction <br />A F1.11
                </div>
                <div class="event-time">11:00 to 12:50</div>
              </div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
          </div>
          <div class="deck">
            <div class="card">
              <div class="day">Tuesday</div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  CS308.1 Software Engineering <br />A F1.10
                </div>
                <div class="event-time">13:00 to 14:50</div>
              </div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  ELIT200.7 Critical Reading and Writing
                  <br />B F1.17
                </div>
                <div class="event-time">15:00 to 16:50</div>
              </div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  MATH205.1 Numerical Analysis
                  <br />A F1.24
                </div>
                <div class="event-time">16:00 to 16:50</div>
              </div>
            </div>
          </div>
          <div class="deck">
            <div class="card">
              <div class="day">Wednesday</div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  SE308.1 Communication Systems and Networks
                  <br />A F2.3
                </div>
                <div class="event-time">9:00 to 9:50</div>
              </div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  CS310.1 Human Computer Interaction <br />A F1.11
                </div>
                <div class="event-time">10:00 to 10:50</div>
              </div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
          </div>
          <div class="deck">
            <div class="card">
              <div class="day">Thursday</div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  CS308.1 Software Engineering <br />A F1.10
                </div>
                <div class="event-time">11:00 to 11:50</div>
              </div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  ELIT200.7 Critical Reading and Writing
                  <br />B F1.17
                </div>
                <div class="event-time">12:00 to 13:50</div>
              </div>
            </div>
            <div class="card">
              <div class="event">
                <div class="event-desc">
                  MATH205.1 Numerical Analysis
                  <br />A F1.24
                </div>
                <div class="event-time">14:00 to 15:50</div>
              </div>
            </div>
          </div>
          <div class="deck">
            <div class="card">
              <div class="day">Friday</div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
          </div>
        </div>
      </div>
    );
  }
}
