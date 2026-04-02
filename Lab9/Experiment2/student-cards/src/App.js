import React from "react";
import StudentCard from "./StudentCard";

function App() {
  const students = [
    {
      name: "Samika Naidu",
      department: "CSE",
      year: "3rd Year",
      section: "A",
      marks: 92,
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Rahul Sharma",
      department: "ECE",
      year: "2nd Year",
      section: "B",
      marks: 85,
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Anjali Verma",
      department: "IT",
      year: "4th Year",
      section: "C",
      marks: 88,
      image: "https://i.pravatar.cc/150?img=9"
    },
    {
      name: "Arjun Reddy",
      department: "CSE",
      year: "3rd Year",
      section: "D",
      marks: 95,
      image: "https://i.pravatar.cc/150?img=15"
    }
  ];

  return (
    <div className="container">
      {students.map((s, index) => (
        <StudentCard key={index} {...s} />
      ))}
    </div>
  );
}

export default App;