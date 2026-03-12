// Declare student details
let studentName = "Arun";

// Declare marks for three subjects
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

// Arrow function to calculate total and average marks
const calculateMarks = (m1, m2, m3) => {
    let total = m1 + m2 + m3;   // calculate total
    let average = total / 3;    // calculate average
    return { total, average };  // return both values
};

// Call the function
let result = calculateMarks(mark1, mark2, mark3);

// Display the results using template literals
console.log(`Student Name: ${studentName}`);
console.log(`Marks: ${mark1}, ${mark2}, ${mark3}`);
console.log(`Total Marks: ${result.total}`);
console.log(`Average Marks: ${result.average.toFixed(2)}`);