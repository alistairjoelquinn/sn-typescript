import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getFriendsList, acceptPendingRequest, removeFriend } from './redux/actions';
import { RootState } from './redux/reducer';

const FriendsStyles = styled.div`
    color: white;
    height: 80vh;
    overflow-x: scroll;
    h1 {
        width: 100vw;
        color: antiquewhite;
        text-align: center;
        padding: 2rem;
    }
`;

const FriendsGridStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 2rem;
    & > div.single-user {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        a {
            border: 1px solid white;
            display: flex;
            justify-content: center;
            width: 10vw;
            height: 10vw;
            overflow: hidden;
            border-radius: 50%;
            &:hover {
                box-shadow: 0 0 10px #ccc;
            }
            img {
                object-fit: cover;
                width: 10vw;
                height: 10vw;
            }
        }
        .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            button {
                padding: 0.5rem;
                margin: 1rem;
                width: 10vw;
                border-radius: 1rem;
                background-color: rgb(227, 81, 64);
                &:hover {
                    background-color: rgb(243, 140, 128);
                }
            }
        }
    }
`;

const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.setAttribute('src', 'animal.jpeg');
};

const Friends = () => {
    const dispatch = useDispatch();
    const friends = useSelector((state: RootState) => state.users?.filter((user) => user.accepted === true));
    const pending = useSelector((state: RootState) => state.users?.filter((user) => user.accepted === false));

    useEffect(() => {
        dispatch(getFriendsList());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <FriendsStyles>
            <h1>Friend Requests Pending...</h1>
            <FriendsGridStyles>
                {pending.map((user) => (
                    <div className="single-user" key={user.userId}>
                        <Link to={`/user/${user.userId}`}>
                            <img src={user.image} alt={user.first} onError={(e) => imageDefault(e)} />
                        </Link>
                        <div className="button-container">
                            <span>
                                {user.first} {user.last}
                            </span>
                            <button type="button" onClick={() => dispatch(acceptPendingRequest(user.friendshipId))}>
                                Accept Request
                            </button>
                        </div>
                    </div>
                ))}
            </FriendsGridStyles>
            <h1>Your current {friends.length} friends...</h1>
            <FriendsGridStyles>
                {friends.map((user) => (
                    <div className="single-user" key={user.userId}>
                        <Link to={`/user/${user.userId}`}>
                            <img src={user.image} alt={user.first} onError={(e) => imageDefault(e)} />
                        </Link>
                        <div className="button-container">
                            <span>
                                {user.first} {user.last}
                            </span>
                            <button type="button" onClick={() => dispatch(removeFriend(user.friendshipId))}>
                                Remove Friend
                            </button>
                        </div>
                    </div>
                ))}
            </FriendsGridStyles>
        </FriendsStyles>
    );
};

export default Friends;
