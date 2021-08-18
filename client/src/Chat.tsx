import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from './socket.io/socket';

export interface ChatMessage {
    comment: string;
    commentId: string;
    userId: string;
    image: string;
    first: string;
    time: Date;
}

const Chat = () => {
    console.log('Chat');
    return (
        <div>
            <h1>Chat Component</h1>
        </div>
    );
};

export default Chat;
