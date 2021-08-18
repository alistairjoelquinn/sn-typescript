const camelCase = require('lodash/camelCase');
const mapKeys = require('lodash/mapKeys');

const { getLastTenChatMessages, newChatMessage, getAuthorInfo } = require('./database/db');

module.exports = (io) => {
    io.on('connection', (socket) => {
        if (!socket.request.session.userId) return socket.disconnect(true);
        const { userId } = socket.request.session;

        getLastTenChatMessages()
            .then(({ rows }) => {
                io.sockets.emit(
                    'chatMessages',
                    rows.map((row) => mapKeys(row, (_, key) => camelCase(key))),
                );
            })
            .catch(console.log('struggled getting those messages'));

        socket.on('chatMessage', (msg) => {
            newChatMessage(userId, msg)
                .then(() => {
                    getAuthorInfo()
                        .then(({ rows }) => {
                            const returnValue = rows.map((row) => mapKeys(row, (_, key) => camelCase(key)))[0];
                            io.sockets.emit('chatMessage', returnValue);
                        })
                        .catch(console.log);
                })
                .catch(console.log);
        });
    });
};
