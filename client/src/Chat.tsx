import styled from 'styled-components';
// import { useAppSelector } from './redux/hooks';
import { socket } from './socket.io/socket';

export interface ChatMessage {
    comment: string;
    commentId: string;
    userId: string;
    image: string;
    first: string;
    time: Date;
}

const ChatStyles = styled.div`
    color: antiquewhite;
`;

const Chat = () => {
    console.log('socket in chat: ', socket);
    socket.emit('helloServer');

    return (
        <ChatStyles>
            <h1>Chat Component</h1>
        </ChatStyles>
    );
};

export default Chat;
