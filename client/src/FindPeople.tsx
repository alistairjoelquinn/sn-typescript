import { useState } from 'react';
import styled from 'styled-components';

const FindPeopleStyles = styled.div`
    font-size: 5rem;
    color: antiquewhite;
`;

const FindPeople = () => {
    const [users, setUsers] = useState([]);
    return (
        <FindPeopleStyles>
            <p>Find People</p>
        </FindPeopleStyles>
    );
};

export default FindPeople;
