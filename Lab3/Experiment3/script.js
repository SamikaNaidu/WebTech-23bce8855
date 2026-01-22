// -------------------------------------------
// 1. STRUCTURE TO STORE QUESTIONS
// -------------------------------------------
const questions = [
    {
        id: 1,
        question: "What is your name?",
        type: "text",
        required: true,
        maxLength: 20
    },
    {
        id: 2,
        question: "Rate our service:",
        type: "radio",
        required: true,
        options: ["Excellent", "Good", "Average", "Poor"]
    },
    {
        id: 3,
        question: "Which features do you use? (Select up to 2)",
        type: "checkbox",
        required: true,
        maxSelect: 2,
        options: ["Chat", "Payments", "Notifications", "Profile"]
    }
];

// -------------------------------------------
// 2. GENERATE FORM DYNAMICALLY
// -------------------------------------------
function loadSurvey() {
    const form = document.getElementById("surveyForm");

    questions.forEach(q => {
        let box = document.createElement("div");
        box.className = "question-box";

        let label = document.createElement("label");
        label.innerText = q.question;
        box.appendChild(label);

        // TEXT INPUT
        if (q.type === "text") {
            let input = document.createElement("input");
            input.type = "text";
            input.id = `q${q.id}`;
            input.maxLength = q.maxLength;
            box.appendChild(input);
        }

        // RADIO BUTTONS
        if (q.type === "radio") {
            q.options.forEach(opt => {
                let div = document.createElement("div");
                div.innerHTML = `
                    <input type="radio" name="q${q.id}" value="${opt}">
                    ${opt}
                `;
                box.appendChild(div);
            });
        }

        // CHECKBOXES
        if (q.type === "checkbox") {
            q.options.forEach(opt => {
                let div = document.createElement("div");
                div.innerHTML = `
                    <input type="checkbox" name="q${q.id}" value="${opt}">
                    ${opt}
                `;
                box.appendChild(div);
            });
        }

        // Error message placeholder
        let err = document.createElement("div");
        err.className = "error";
        err.id = `error${q.id}`;
        box.appendChild(err);

        form.appendChild(box);
    });
}

loadSurvey();

// -------------------------------------------
// 3. VALIDATION LOGIC
// -------------------------------------------
function validateSurvey() {
    let valid = true;

    questions.forEach(q => {
        let err = document.getElementById(`error${q.id}`);
        err.innerText = ""; // reset error messages

        // TEXT VALIDATION
        if (q.type === "text") {
            let val = document.getElementById(`q${q.id}`).value.trim();

            if (q.required && val === "") {
                err.innerText = "This field is required.";
                valid = false;
            }
            if (val.length > q.maxLength) {
                err.innerText = `Maximum ${q.maxLength} characters allowed.`;
                valid = false;
            }
        }

        // RADIO VALIDATION
        if (q.type === "radio") {
            let selected = document.querySelector(`input[name="q${q.id}"]:checked`);
            if (q.required && !selected) {
                err.innerText = "Please select an option.";
                valid = false;
            }
        }

        // CHECKBOX VALIDATION
        if (q.type === "checkbox") {
            let checked = document.querySelectorAll(`input[name="q${q.id}"]:checked`);

            if (q.required && checked.length === 0) {
                err.innerText = "Select at least one option.";
                valid = false;
            }

            if (checked.length > q.maxSelect) {
                err.innerText = `You can select maximum ${q.maxSelect} options.`;
                valid = false;
            }
        }
    });

    return valid;
}

// -------------------------------------------
// 4. PREVENT SUBMISSION UNTIL VALID
// -------------------------------------------
document.getElementById("submitBtn").addEventListener("click", function () {
    let msg = document.getElementById("formMsg");

    if (validateSurvey()) {
        msg.style.color = "green";
        msg.innerText = "Survey Submitted Successfully!";
    } else {
        msg.style.color = "red";
        msg.innerText = "Please fix the errors above.";
    }
});
