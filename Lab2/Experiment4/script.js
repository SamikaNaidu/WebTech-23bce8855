// Select DOM Elements
const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const clearAllBtn = document.getElementById('clearAll');

// Initial load
document.addEventListener('DOMContentLoaded', displayUsers);

// Handle Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    // 1. Validation: Mobile (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }

    // 2. Validation: Password (Min 6 chars)
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 3. Validation: Duplicate Email
    const isDuplicate = users.some(user => user.email === email);
    if (isDuplicate) {
        alert("This email is already registered.");
        return;
    }

    // Create User Object
    const newUser = { name, email, mobile, password };

    // Save to LocalStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    displayUsers();
});

// Display Users in Table
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
        `;
        userList.appendChild(row);
    });
}

// Delete Single User
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

// Clear All Users
clearAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all users?")) {
        localStorage.removeItem('users');
        displayUsers();
    }
});
