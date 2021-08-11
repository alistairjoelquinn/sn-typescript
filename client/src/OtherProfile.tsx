import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserData } from './App';

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
        <div>
            <h1>Other Profile for user {user.first}</h1>
        </div>
    );
};

export default OtherProfile;
