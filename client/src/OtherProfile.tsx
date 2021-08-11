import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserData } from './App';
import { ProfilePageStyles } from './Profile';

const OtherProfile = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserData>({});

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/user/other-user/${id}`);
            setUser(data);
        })();
    }, []);

    return (
        <ProfilePageStyles>
            <img src={user.image} alt={`${user.first} ${user.last}`} />
            <div>
                <p>
                    {user.first} {user.last}
                </p>
                <div>
                    <div>{user.bio}</div>
                </div>
            </div>
        </ProfilePageStyles>
    );
};

export default OtherProfile;
