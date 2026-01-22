// TEMPORARY STORAGE VARIABLES
let formData = {
    name: "",
    age: "",
    email: "",
    phone: "",
    password: ""
};

// Show First Stage by Default
let currentStage = 1;
document.getElementById("stage1").classList.add("active");

// Update progress bar
function updateProgress() {
    document.getElementById("progressBar").style.width = (currentStage * 25) + "%";
}

// NAVIGATION: NEXT STAGE
function nextStage(stage) {
    if (!validate(stage)) return;

    saveData(stage);

    document.getElementById(`stage${stage}`).classList.remove("active");
    document.getElementById(`stage${stage+1}`).classList.add("active");
    currentStage = stage + 1;

    if (currentStage === 4) loadSummary();

    updateProgress();
}

// NAVIGATION: PREVIOUS STAGE
function prevStage(stage) {
    document.getElementById(`stage${stage}`).classList.remove("active");
    document.getElementById(`stage${stage-1}`).classList.add("active");
    currentStage = stage - 1;
    updateProgress();
}

// VALIDATION RULES FOR EACH STAGE
function validate(stage) {

    if (stage === 1) {  
        let name = document.getElementById("name").value.trim();
        let age = document.getElementById("age").value.trim();

        if (name === "" || age === "") {
            document.getElementById("err1").innerText = "All fields are required.";
            return false;
        }
        if (age < 1) {
            document.getElementById("err1").innerText = "Age must be positive.";
            return false;
        }
        document.getElementById("err1").innerText = "";
        return true;
    }

    if (stage === 2) {
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();

        if (email === "" || phone === "") {
            document.getElementById("err2").innerText = "All fields are required.";
            return false;
        }
        if (!email.includes("@")) {
            document.getElementById("err2").innerText = "Invalid email address.";
            return false;
        }
        if (phone.length !== 10) {
            document.getElementById("err2").innerText = "Phone must be 10 digits.";
            return false;
        }
        document.getElementById("err2").innerText = "";
        return true;
    }

    if (stage === 3) {
        let pass = document.getElementById("password").value;
        let confirm = document.getElementById("confirmPassword").value;

        if (pass.length < 6) {
            document.getElementById("err3").innerText =
                "Password must be at least 6 characters.";
            return false;
        }
        if (pass !== confirm) {
            document.getElementById("err3").innerText = "Passwords do not match.";
            return false;
        }
        document.getElementById("err3").innerText = "";
        return true;
    }

    return true;
}

// SAVE DATA TEMPORARILY
function saveData(stage) {
    if (stage === 1) {
        formData.name = document.getElementById("name").value.trim();
        formData.age = document.getElementById("age").value.trim();
    }

    if (stage === 2) {
        formData.email = document.getElementById("email").value.trim();
        formData.phone = document.getElementById("phone").value.trim();
    }

    if (stage === 3) {
        formData.password = document.getElementById("password").value.trim();
    }
}

// DISPLAY SUMMARY BEFORE SUBMIT
function loadSummary() {
    document.getElementById("summary").innerText =
        `Name: ${formData.name}
Age: ${formData.age}
Email: ${formData.email}
Phone: ${formData.phone}`;
}

// FINAL SUBMIT
function submitForm() {
    document.getElementById("err4").innerText = "";
    alert("Form Submitted Successfully!");
}
