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
    height: 70vh;
    padding: 2rem;
    margin: 2rem 25vw;
    gap: 2rem;
    background-color: antiquewhite;
    border-radius: 1rem;
    color: black;
    .chat-container {
        flex-grow: 3;
        overflow-y: scroll;
        .single-message {
            display: flex;
            align-items: center;
            img {
                height: clamp(30px, 5vw, 80px);
                width: clamp(30px, 5vw, 80px);
                object-fit: cover;
                padding: 1rem;
                border-radius: 50%;
            }
        }
    }
    .input-container {
        flex-grow: 1;
        width: 100%;
        border-radius: 1rem;
    }
`;

const Chat = () => {
    const chatMessages = useAppSelector((state) => state.comments);

    return (
        <ChatStyles>
            <div className="chat-container">
                {chatMessages.map((message) => (
                    <div className="single-message" key={message.commentId}>
                        <img src={message.image} alt={message.first} />
                        <p key={message.commentId}>{message.comment}</p>
                    </div>
                ))}
            </div>
            <textarea className="input-container" placeholder="Enter your message here" />
        </ChatStyles>
    );
};

export default Chat;
