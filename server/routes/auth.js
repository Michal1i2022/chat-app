const express = require('express');
const router = express.Router();

// rejestracja
router.post('/register', (req, res) => {
    // Logika rejestracji usera
    res.send("Register endpoint")
});

// logowanie
router.post('/login', (req, res) => {
    // Logika logowania usera
    res.send("Login endpoint")
});

module.exports = router;

