import React from "react";
import "./StudentCard.css";

function StudentCard(props) {
  return (
    <div className={`card ${props.marks > 90 ? "topper" : ""}`}>
      
      <img src={props.image} alt="profile" className="profile-img" />

      <h2>{props.name}</h2>
      <p className="dept">{props.department}</p>

      <div className="info">
        <p><strong>Year:</strong> {props.year}</p>
        <p><strong>Section:</strong> {props.section}</p>
        <p><strong>Marks:</strong> {props.marks}</p>
      </div>

      {props.marks > 90 && <span className="badge">🏆 Topper</span>}
    </div>
  );
}

export default StudentCard;