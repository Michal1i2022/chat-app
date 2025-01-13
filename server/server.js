const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const serverless = require('serverless-http');

// Inicjalizacja aplikacji
const app = express();

// Middleware
app.use(express.json()); // Obsługa JSON w ciele żądań

// Połączenie z bazą danych
connectDB();

// Trasy API
app.use('/api/auth', authRoutes); // Trasy dla rejestracji i logowania
app.use('/api/chat', chatRoutes); // Trasy dla wiadomości

// Serwowanie plików statycznych
app.use(express.static(path.join(__dirname, 'public')));

// Tworzenie serwera HTTP i integracja Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }, // Zezwolenie na dostęp z dowolnego źródła (dostosuj na produkcji)
});

// Socket.io dla wiadomości w czasie rzeczywistym
io.on('connection', (socket) => {
  console.log('New client connected');

  // Obsługa wiadomości przychodzących
  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    io.emit('receive_message', data); // Emitowanie wiadomości do wszystkich klientów
  });

  // Obsługa rozłączenia klienta
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Przekierowanie na frontend dla wszystkich innych tras
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export funkcji dla AWS Lambda
module.exports.handler = serverless(app);