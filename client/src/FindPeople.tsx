import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FindPeopleStyles = styled.div`
    font-size: 5rem;
    color: antiquewhite;
`;

const FindPeople = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`/user/recent-users`)
            .then(({ data }) => setUsers(data))
            .catch(console.log);
    }, []);

    return (
        <FindPeopleStyles>
            <p>Find People</p>
            {users.map((user) => (
                <div key={user.id}>
                    {user.first} {user.last}
                </div>
            ))}
        </FindPeopleStyles>
    );
};

export default FindPeople;
