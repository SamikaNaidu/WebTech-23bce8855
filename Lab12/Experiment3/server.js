const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// ===============================
// 1️⃣ Connect to MongoDB
// ===============================
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));

// ===============================
// 2️⃣ Schema & Model
// ===============================
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// ===============================
// 3️⃣ Routes (CRUD)
// ===============================

// Home
app.get('/', (req, res) => {
    res.send('MongoDB API Running 🚀');
});

// CREATE
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===============================
// 4️⃣ Start Server
// ===============================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});