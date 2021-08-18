import styled from 'styled-components';
import { formatRelative } from 'date-fns';
import { Link } from 'react-router-dom';

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
        display: flex;
        flex-direction: column-reverse;
    }
    .input-container {
        flex-grow: 1;
        width: 100%;
        min-height: 12vh;
        border-radius: 1rem;
    }
`;

const SingleMessageStyles = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${(p: { otherUserId: string; currentUser: string }) =>
        p.otherUserId === p.currentUser ? 'row-reverse' : 'row'};
    .text-container {
        display: flex;
        flex-direction: column;
        align-items: ${(p: { otherUserId: string; currentUser: string }) =>
            p.otherUserId === p.currentUser ? 'flex-end' : 'flex-start'};
    }
    img {
        height: clamp(30px, 5vw, 80px);
        width: clamp(30px, 5vw, 80px);
        object-fit: cover;
        padding: 1rem;
        border-radius: 50%;
    }
    p:nth-child(2) {
        color: #9e9797;
        font-size: 1rem;
    }
`;

const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.setAttribute('src', 'animal.jpeg');
};

const Chat = ({ currentUser }: { currentUser: string }) => {
    const chatMessages = useAppSelector((state) => state.comments);

    const keyCheck = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            socket.emit('chatMessage', e.currentTarget.value);
            e.currentTarget.value = '';
        }
    };

    return (
        <ChatStyles>
            <div className="chat-container">
                {chatMessages.map((message) => (
                    <SingleMessageStyles otherUserId={message.id} currentUser={currentUser} key={message.commentId}>
                        <Link to={`/user/${message.id}`}>
                            <img src={message.image} alt={message.first} onError={imageDefault} />
                        </Link>
                        <div className="text-container">
                            <p>{message.comment}</p>
                            <p>{formatRelative(new Date(message.time), Date.now())}</p>
                        </div>
                    </SingleMessageStyles>
                ))}
            </div>
            <textarea className="input-container" placeholder="Enter your message here" onKeyDown={keyCheck} />
        </ChatStyles>
    );
};

export default Chat;
