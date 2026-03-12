// Define a class named Course
class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    // Method to display course details
    displayCourse() {
        console.log("------ Course Information ------");
        console.log(`Course Name: ${this.courseName}`);
        console.log(`Instructor: ${this.instructor}`);
        console.log("--------------------------------");
    }
}

// Create an object of the Course class
let course1 = new Course("Web Technologies", "Dr. Kumar");

// Call the method to display course details
course1.displayCourse();

console.log("Checking seat availability for enrollment...");

// Create a Promise to simulate course enrollment
let enrollCourse = new Promise((resolve, reject) => {

    // Assume total seats and enrolled students
    let totalSeats = 30;
    let enrolledStudents = 25;

    console.log(`Total Seats: ${totalSeats}`);
    console.log(`Enrolled Students: ${enrolledStudents}`);

    // Check if seats are available
    if (enrolledStudents < totalSeats) {
        resolve("Enrollment Successful");
    } else {
        reject("Course Full");
    }
});

// Handle the result of the promise
enrollCourse
    .then(message => {
        console.log(message);
        console.log("Student has been successfully enrolled in the course.");
    })
    .catch(error => {
        console.log(error);
        console.log("No seats available for this course.");
    });