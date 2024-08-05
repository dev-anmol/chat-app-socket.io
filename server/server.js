const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors')

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
}))


io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
    socket.on('message', (message) => {
        io.emit('message', message+"_server");
    })
})

server.listen(3000, ()=>{
    console.log('Listening on port 3000')
})