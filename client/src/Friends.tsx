import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getFriendsList, acceptPendingRequest, removeFriend } from './redux/actions';
import { RootState } from './redux/reducer';

const FriendsStyles = styled.div`
    color: white;
`;

const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.setAttribute('src', 'animal.jpeg');
};

const Friends = () => {
    const dispatch = useDispatch();
    const friends = useSelector((state: RootState) => state.users?.filter((user) => user.accepted === true));
    const pending = useSelector((state: RootState) => state.users?.filter((user) => user.accepted === false));

    console.log('friends, pending: ', friends, pending);

    useEffect(() => {
        dispatch(getFriendsList());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <FriendsStyles>
            <h1>Friend Requests Pending...</h1>
            {pending.map((user) => (
                <div key={user.userId}>
                    <Link to={`/user/${user.userId}`}>
                        <img src={user.image} alt={user.first} onError={(e) => imageDefault(e)} />
                    </Link>
                    <div>
                        <span>
                            {user.first} {user.last}
                        </span>
                        <button type="button" onClick={() => dispatch(acceptPendingRequest(user.friendshipId))}>
                            Accept Request
                        </button>
                    </div>
                </div>
            ))}
            <h1>Your current {friends.length} friends...</h1>
            {friends.map((user) => (
                <div key={user.userId}>
                    <Link to={`/user/${user.userId}`}>
                        <img src={user.image} alt={user.first} onError={(e) => imageDefault(e)} />
                    </Link>
                    <div>
                        <span>
                            {user.first} {user.last}
                        </span>
                        <button type="button" onClick={() => dispatch(removeFriend(user.friendshipId))}>
                            Remove Friend
                        </button>
                    </div>
                </div>
            ))}
        </FriendsStyles>
    );
};

export default Friends;
