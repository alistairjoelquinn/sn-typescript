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
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    padding: 2rem 20vw;
    gap: 2rem;
    color: antiquewhite;
    .chat-container {
        flex-grow: 3;
    }
    .input-container {
        flex-grow: 1;
        width: 100%;
    }
`;

const Chat = () => {
    const chatMessages = useAppSelector((state) => state.comments);

    return (
        <ChatStyles>
            <div className="chat-container">
                {chatMessages.map((message) => (
                    <p key={message.commentId}>{message.comment}</p>
                ))}
            </div>
            <textarea className="input-container" placeholder="Enter your message here" />
        </ChatStyles>
    );
};

export default Chat;
