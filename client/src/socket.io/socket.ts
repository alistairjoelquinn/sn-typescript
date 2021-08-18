import { Socket, io } from 'socket.io-client';

import { ChatMessage } from '../Chat';
import { getMessages, chatMessage } from '../redux/actions';

console.log('io: ', io);

export let socket: Socket;

export const init = (store: any) => {
    console.log('store: ', store);
    if (!socket) {
        socket = io();
        socket.on('chatMessages', (msgs: ChatMessage[]) => store.dispatch(getMessages(msgs)));
        socket.on('chatMessage', (msg: ChatMessage) => store.dispatch(chatMessage(msg)));
    }
};
