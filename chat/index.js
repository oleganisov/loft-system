module.exports = (io) => {
  const connectedUsers = {};
  const historyMessage = {};

  io.on('connection', (socket) => {
    const socketId = socket.id;

    socket.on('users:connect', ({ userId, username }) => {
      const user = { userId, username, socketId, activeRoom: null };
      connectedUsers[socketId] = user;

      console.log('connectedUser: ' + username);

      socket.emit('users:list', Object.values(connectedUsers));
      socket.broadcast.emit('users:add', user);
    });

    socket.on('message:add', (data) => {
      console.log('message:add ', data);
      const { senderId, recipientId, roomId } = data;
      socket.emit('message:add', data);
      socket.broadcast.to(roomId).emit('message:add', data);
      addMessageToHistory(senderId, recipientId, data);
      addMessageToHistory(recipientId, senderId, data);
    });

    socket.on('message:history', (data) => {
      console.log('message:history ', data);
      console.log(historyMessage);
      if (
        historyMessage[data.userId] &&
        historyMessage[data.userId][data.recipientId]
      ) {
        socket.emit(
          'message:history',
          historyMessage[data.userId][data.recipientId]
        );
        console.log(historyMessage[data.userId][data.recipientId]);
      }
    });

    socket.on('disconnect', (data) => {
      delete connectedUsers[socketId];
      socket.broadcast.emit('users:leave', socketId);
    });
  });

  const addMessageToHistory = (senderId, recipientId, data) => {
    if (historyMessage[senderId]) {
      if (historyMessage[senderId][recipientId]) {
        if (historyMessage[senderId][recipientId].length > 10) {
          historyMessage[senderId][recipientId].shift();
        }
        historyMessage[senderId][recipientId].push(data);
      } else {
        historyMessage[senderId][recipientId] = [];
        historyMessage[senderId][recipientId].push(data);
      }
    } else {
      historyMessage[senderId] = {};
      historyMessage[senderId][recipientId] = [];
      historyMessage[senderId][recipientId].push(data);
    }
  };
};
