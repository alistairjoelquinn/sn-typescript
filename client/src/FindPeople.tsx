import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FindPeopleStyles = styled.div`
    font-size: 3rem;
    color: antiquewhite;
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
    justify-content: center;
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
                }
            }
        }
    }
`;

const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.setAttribute('src', 'animal.jpeg');
};

const FindPeople: React.FC = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`/user/recent-users`)
            .then(({ data }) => setUsers(data))
            .catch(console.log);
    }, []);

    return (
        <FindPeopleStyles>
            <div className="find-people-grid">
                {users.map((user) => (
                    <div key={user.id} className="single-user">
                        <div>
                            {user.first} {user.last}
                        </div>
                        <Link to={`/user/${user.id}`}>
                            <img
                                src={
                                    user.image ||
                                    'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png'
                                }
                                alt={user.first}
                                onError={(e) => imageDefault(e)}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </FindPeopleStyles>
    );
};

export default FindPeople;
