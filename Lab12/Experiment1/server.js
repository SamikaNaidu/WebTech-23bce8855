const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data (in-memory)
let users = [
    { id: 1, name: "Samika" },
    { id: 2, name: "Alex" }
];

// ✅ Home route (fix for "Cannot GET /")
app.get('/', (req, res) => {
    res.send('Welcome to my REST API 🚀');
});

// 1️⃣ GET - All users
app.get('/users', (req, res) => {
    res.json(users);
});

// 2️⃣ GET - Single user
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// 3️⃣ POST - Add user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// 4️⃣ PUT - Update user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;
    res.json(user);
});

// 5️⃣ DELETE - Remove user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);

    res.json({ message: "User deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});