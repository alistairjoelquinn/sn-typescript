import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { receiveRequestsFriends, acceptRequestsPending, removeFriend } from './redux/actions';

const FriendsStyles = styled.div`
    color: white;
`;

const Friends = () => {
    const test = useSelector((state) => state);

    console.log('test: ', test);

    return (
        <FriendsStyles>
            <div>Friends</div>
        </FriendsStyles>
    );
};

export default Friends;
