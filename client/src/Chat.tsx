import styled from 'styled-components';
import { useAppSelector } from './redux/hooks';
import { socket } from './socket.io/socket';

export interface ChatMessage {
    comment: string;
    commentId: string;
    id: string;
    image: string;
    first: string;
    time: Date;
}

const ChatStyles = styled.div`
    color: antiquewhite;
`;

const Chat = () => {
    const chatMessages = useAppSelector((state) => state.comments);

    return (
        <ChatStyles>
            <h1>Chat Component</h1>
            {chatMessages.map((message) => (
                <p key={message.commentId}>{message.comment}</p>
            ))}
        </ChatStyles>
    );
};

export default Chat;
