const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Importowanie tras
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

// Tworzenie aplikacji
const app = express();

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;