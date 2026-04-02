import React from "react";
import "./StudentProfile.css";

function StudentProfile() {
  const student = {
    name: "Samika Naidu",
    department: "Computer Science",
    year: "3rd Year",
    section: "A",
    skills: ["React", "Java", "SQL", "MongoDB"],
    email: "samika@email.com"
  };

  return (
    <div className="card">
      <img 
        src="https://i.pravatar.cc/150?img=5" 
        alt="profile" 
        className="profile-img" 
    />

      <h2>{student.name}</h2>
      <p className="dept">{student.department}</p>

      <div className="info">
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>Section:</strong> {student.section}</p>
        <p><strong>Email:</strong> {student.email}</p>
      </div>

      <div className="skills">
        <h3>Skills</h3>
        <ul>
          {student.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentProfile;