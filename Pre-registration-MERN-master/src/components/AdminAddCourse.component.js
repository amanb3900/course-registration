import React, { useState } from "react";
import axios from "axios";

const AdminAddCourse = () => {
  const [course_id, set_course_id] = useState("");
  const [course_name, set_course_name] = useState("");
  const [Lecturer, set_Lecturer] = useState("");
  const [AcademicUnit, set_AcademicUnit] = useState("");
  const [prerequisite, set_prerequisite] = useState("");
  const [UpdatedDate, set_UpdatedDate] = useState("");
  const [Url, set_Url] = useState("");

  const handleAddCourse = async (e) => {
    e.preventDefault();
    console.log(course_id);
    await axios
      .post("http://localhost:5500/courses/add", {
        course_id: course_id,
        course_name: course_name,
        Lecturer: Lecturer,
        AcademicUnit: AcademicUnit,
        prerequisite: prerequisite,
        UpdatedDate: UpdatedDate,
        Url: Url,
      })
      .then(() => {
        alert("Course added successfully!");
      });
  };

  return (
    <div>
      <h1 >Admin Add Course</h1>
      <form>
        <div className="form-group">
          <label>Course ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Course ID"
            value={course_id}
            onChange={(e) => set_course_id(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Course Name"
            value={course_name}
            onChange={(e) => set_course_name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Lecturer</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Lecturer"
            value={Lecturer}
            onChange={(e) => set_Lecturer(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Academic Unit</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Academic Unit"
            value={AcademicUnit}
            onChange={(e) => set_AcademicUnit(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Prerequisite</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Prerequisite"
            value={prerequisite}
            onChange={(e) => set_prerequisite(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={handleAddCourse}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default AdminAddCourse;
