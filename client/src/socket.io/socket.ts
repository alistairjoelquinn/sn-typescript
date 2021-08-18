import { io, Socket } from 'socket.io-client';

import { ChatMessage } from '../Chat';
import { getMessages, chatMessage } from '../redux/actions';
import { ReduxDispatch } from '../redux/hooks';

export let socket: Socket;

export const init = ({ dispatch }: { dispatch: ReduxDispatch }) => {
    if (!socket) {
        socket = io();
        socket.on('chatMessages', (msgs: ChatMessage[]) => dispatch(getMessages(msgs)));
        socket.on('chatMessage', (msg: ChatMessage) => dispatch(chatMessage(msg)));
    }
};
