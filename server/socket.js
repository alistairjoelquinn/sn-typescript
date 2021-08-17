module.exports = (io) => {
    io.on('connection', (socket) => {
        if (!socket.request.session.userId) return socket.disconnect(true);
        const { userId } = socket.request.session;

        getLastTenChatMessages()
            .then(({ rows }) => io.sockets.emit('chatMessages', rows))
            .catch(console.log('struggled getting those messages'));

        socket.on('chatMessage', (msg) => {
            newChatMessage(userId, msg).then(() => {
                getAuthorInfo().then(({ rows }) => {
                    io.sockets.emit('chatMessage', [rows, userId]);
                });
            });
        });
    });
};
