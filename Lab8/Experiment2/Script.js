// Create a student object with details
const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

// Display the original student object
console.log("Original Student Object:");
console.log(student);

// Use object destructuring to extract values
const { id, name, department, marks } = student;

// Display the extracted values
console.log("Student Details:");
console.log(`ID: ${id}`);
console.log(`Name: ${name}`);
console.log(`Department: ${department}`);
console.log(`Marks: ${marks}`);

// Determine grade based on marks
let grade;
if (marks >= 90) {
    grade = "A";
} else if (marks >= 75) {
    grade = "B";
} else if (marks >= 60) {
    grade = "C";
} else {
    grade = "D";
}

// Create a new object using the spread operator and add grade
const updatedStudent = {
    ...student,
    grade: grade
};

// Display the updated student object
console.log("Updated Student Object:");
console.log(updatedStudent);