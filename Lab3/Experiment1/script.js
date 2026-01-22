const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const role = document.getElementById("role");
const submitBtn = document.getElementById("submitBtn");
const skillsContainer = document.getElementById("skillsContainer");

const emailMsg = document.getElementById("emailMsg");
const passMsg = document.getElementById("passMsg");
const confirmMsg = document.getElementById("confirmMsg");

// --- Email Validation (domain check) ---
email.addEventListener("input", () => {
    const pattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|vitapstudent)\.com$/;

    if (!pattern.test(email.value)) {
        setInvalid(email, emailMsg, "Invalid domain. Allowed: gmail, yahoo, vitstudent");
    } else {
        setValid(email, emailMsg);
    }
});

// --- Password Validation (changes based on role) ---
password.addEventListener("input", validatePassword);
role.addEventListener("change", validatePassword);

function validatePassword() {
    let pass = password.value;
    let selected = role.value;

    let strong = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/; // for Admin
    let medium = /.{6,}/; // for Student, Teacher

    if (selected === "Admin") {
        if (!strong.test(pass)) {
            setInvalid(password, passMsg, "Admin password must be 8+ chars, include uppercase, number & symbol.");
        } else {
            setValid(password, passMsg);
        }
    } else {
        if (!medium.test(pass)) {
            setInvalid(password, passMsg, "Password must be at least 6 characters.");
        } else {
            setValid(password, passMsg);
        }
    }
}

// --- Confirm Password Validation ---
confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value !== password.value) {
        setInvalid(confirmPassword, confirmMsg, "Passwords do not match");
    } else {
        setValid(confirmPassword, confirmMsg);
    }
});

// --- Show/Hide Skills based on Role ---
role.addEventListener("change", () => {
    if (role.value === "Teacher") {
        skillsContainer.style.display = "block";
    } else {
        skillsContainer.style.display = "none";
    }
});

// --- Validation Helper Functions ---
function setInvalid(input, msgElement, message) {
    input.classList.add("invalid");
    msgElement.innerText = message;
}

function setValid(input, msgElement) {
    input.classList.remove("invalid");
    msgElement.innerText = "";
}

// --- Prevent Form Submission ---
document.getElementById("regForm").addEventListener("submit", (e) => {
    if (document.querySelectorAll(".invalid").length > 0) {
        e.preventDefault();
        alert("Please fix the errors before submitting.");
    }
});
