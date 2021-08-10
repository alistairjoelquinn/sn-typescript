import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FindPeopleStyles = styled.div`
    font-size: 5rem;
    color: antiquewhite;
`;

const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.setAttribute(
        'src',
        'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png',
    );
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
            {users.map((user) => (
                <div key={user.id}>
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
        </FindPeopleStyles>
    );
};

export default FindPeople;
