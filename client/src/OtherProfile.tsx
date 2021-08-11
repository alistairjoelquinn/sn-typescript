import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserData } from './App';
import { ProfilePageStyles } from './Profile';

const OtherProfile = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [user, setUser] = useState<UserData>({});

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/user/other-user/${id}`);
            console.log('data: ', data);
            if (data.currentUser) {
                history.push('/');
            } else {
                setUser(data);
            }
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
