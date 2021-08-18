import { io } from 'socket.io-client';

import { ChatMessage } from '../Chat';
import { getMessages, chatMessage } from '../redux/actions';

export let socket: any;

export const init = (store: any) => {
    if (!socket) {
        socket = io();
        socket.on('chatMessages', (msgs: ChatMessage[]) => store.dispatch(getMessages(msgs)));
        socket.on('chatMessage', (msg: ChatMessage) => store.dispatch(chatMessage(msg)));
    }
};
