const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

let users = {};
const rooms = ['general', 'random', 'practice'];

io.on('connection', (socket) => {
  socket.on('users:connect', ({ userId, username }) => {
    socket.emit('registerInfo', { userId: socket.id });
    console.log('connectedUser: ' + socket.id);
    console.log(socket);
  });
});
