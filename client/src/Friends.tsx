import { useEffect } from 'react';
import styled from 'styled-components';
import { useFriendsDispatch, useFriendsState } from './context/friends/context';
import { getFriendsList, acceptPendingRequest, removeFriend } from './context/friends/actions';
import SingleUser from './SingleUser';
import ButtonStyles from './styles/ButtonStyles';

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
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & div.single-user {
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
        }
    }
    @media (max-width: 700px) {
        grid-template-columns: 1fr 1fr 1fr;
        & div.single-user {
            a {
                width: 25vw;
                height: 25vw;
                img {
                    width: 25vw;
                    height: 25vw;
                }
            }
        }
    }
`;

const Friends = () => {
    const dispatch = useFriendsDispatch();
    const friends = useFriendsState().users?.filter(user => user.accepted === true);
    const pending = useFriendsState().users?.filter((user) => user.accepted === false);

    useEffect(() => {
        getFriendsList(dispatch);
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <FriendsStyles>
            <h1>Friend Requests Pending...</h1>
            <FriendsGridStyles>
                {pending.map((user) => (
                    <div key={user.id}>
                        <SingleUser user={user} />
                        <ButtonStyles type="button" onClick={() => acceptPendingRequest(dispatch, user.friendshipId)}>
                            Accept Request
                        </ButtonStyles>
                    </div>
                ))}
            </FriendsGridStyles>
            <h1>Your current {friends.length} friends...</h1>
            <FriendsGridStyles>
                {friends.map((user) => (
                    <div key={user.id}>
                        <SingleUser user={user} />
                        <ButtonStyles type="button" onClick={() => removeFriend(dispatch, user.friendshipId)}>
                            Remove Friend
                        </ButtonStyles>
                    </div>
                ))}
            </FriendsGridStyles>
        </FriendsStyles>
    );
};

export default Friends;
