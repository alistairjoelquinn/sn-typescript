import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SingleUser from './SingleUser';

export interface User {
    first: string;
    last: string;
    id: number;
    image: string;
}

const FindPeopleStyles = styled.div`
    font-size: 3rem;
    color: antiquewhite;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100vw;
    height: 80vh;
    overflow-x: scroll;
    align-items: center;
    justify-content: flex-start;
    input {
        padding: 0.7rem;
        margin: 0.5rem;
        width: 25vw;
        background-color: antiquewhite;
        border-radius: 1rem;
        &::placeholder {
            font-size: 2.4rem;
        }
    }
    .find-people-grid {
        display: grid;
        grid-template-columns: 25vw 25vw 25vw;
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
                width: 20vw;
                height: 20vw;
                overflow: hidden;
                border-radius: 50%;
                &:hover {
                    box-shadow: 0 0 10px #ccc;
                }
                img {
                    object-fit: cover;
                    width: 20vw;
                    height: 20vw;
                }
            }
        }
    }
`;

const FindPeople = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        if (searchTerm) {
            axios
                .get(`user/user-search/${searchTerm}`)
                .then(({ data }) => setUsers(data))
                .catch(console.log);
        } else {
            axios
                .get(`/user/recent-users`)
                .then(({ data }) => setUsers(data))
                .catch(console.log);
        }
    }, [searchTerm]);

    return (
        <FindPeopleStyles>
            <h3>Search for someone you know...</h3>
            <input type="text" placeholder="Enter a name..." onChange={(e) => setSearchTerm(e.target.value)} />
            {!searchTerm && <p>Check out who just joined!</p>}
            {searchTerm && !users.length && <p>No results...</p>}
            <div className="find-people-grid">
                {users.map((user) => (
                    <SingleUser user={user} />
                ))}
            </div>
        </FindPeopleStyles>
    );
};

export default FindPeople;
