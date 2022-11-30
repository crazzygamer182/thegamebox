
var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("server is running...");

io.sockets.on('connection', newConnection);

//app.use(cors({
   // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
//}));

function newConnection(socket) {
    console.log('new connection ' + socket.id);
    socket.on('mouse', mouseMsg);
    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
    }
}