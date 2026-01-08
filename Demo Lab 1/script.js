document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const regno = document.getElementById("regno").value.trim();

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // basic email pattern[web:7][web:15]
        const regnoPattern = /^[0-9]{8}$/; // example: 8 digits

        let errors = [];

        if (name.length < 3) {
            errors.push("Name must be at least 3 characters.");
        }
        if (!emailPattern.test(email)) {
            errors.push("Enter a valid email.");
        }
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters.");
        }
        if (!regnoPattern.test(regno)) {
            errors.push("Registration number must be 8 digits.");
        }

        if (errors.length > 0) {
            message.style.color = "red";
            message.textContent = errors.join(" ");
        } else {
            message.style.color = "green";
            message.textContent = "Registration successful!";
            form.reset();
        }
    });
});
