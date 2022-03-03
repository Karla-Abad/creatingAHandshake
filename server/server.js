const express = require("express");
const app = express();
const cors = require("cors");
const socket = require ("socket.io");
const port = 8000;
app.use(cors());

const server = app.listen(port, ()=> { console.log(`Listening on port: ${port}`)});

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true,
    }
});

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    console.log("Nice to meet you. (shake hand)")
    socket.emit(console.log("Welcome new Friend!"));
    socket.on("event_from_client", data => {
        // send a message with "data" to ALL clients EXCEPT for the one that emitted the
    	//     "event_from_client" event
        socket.broadcast.emit("event_to_all_other_clients", data);
    });
});

