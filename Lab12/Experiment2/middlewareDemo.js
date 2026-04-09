const express = require('express');
const app = express();
const PORT = 3000;

// ===============================
// 1️⃣ GLOBAL MIDDLEWARE
// ===============================
app.use((req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`[GLOBAL] ${req.method} ${req.url} at ${time}`);
    next(); // move to next middleware
});

// ===============================
// 2️⃣ SECOND GLOBAL MIDDLEWARE
// ===============================
app.use((req, res, next) => {
    console.log("[GLOBAL 2] Middleware executed");
    next();
});

// ===============================
// 3️⃣ ROUTE-SPECIFIC MIDDLEWARE
// ===============================
const checkUser = (req, res, next) => {
    console.log("[ROUTE] Checking user access...");
    next();
};

// ===============================
// 4️⃣ ROUTES
// ===============================

// Home route
app.get('/', (req, res) => {
    res.send('Home Page 🏠');
});

// Route WITHOUT middleware
app.get('/public', (req, res) => {
    res.send('Public Route (No special middleware)');
});

// Route WITH middleware
app.get('/private', checkUser, (req, res) => {
    res.send('Private Route (Middleware applied)');
});

// ===============================
// 5️⃣ START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});