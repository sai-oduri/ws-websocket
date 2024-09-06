import WebSocket, { WebSocketServer } from "ws";
import http from 'http';

const server = http.createServer(function (request, response) {
    console.log((new Date()) + " Received request for " + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

let userCount = 0;

wss.on('connection', function (socket) {

    socket.on('error', (err) => console.log(err));

    socket.on('message', (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        })
    })

    console.log("User connected ", ++userCount);

    socket.send("Hello! Message from Server!!");
})

server.listen(8080, () => {
    console.log((new Date()) + " Server is listening on port 8080");
})