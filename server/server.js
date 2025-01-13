const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Port
const PORT = process.env.PORT || 3000;

// Połączenie z bazą danych.
connectDB();

// Serwer HTTP
const server = http.createServer(app)

// Inicjalizowanie Socket.io
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("send_message", (data) => {
        console.log("Message received: ", data);
        io.emit("receive_message", data);
    })

    socket.on('disconnected', () => {
        console.log("User disconnected: ", socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});