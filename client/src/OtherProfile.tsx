import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserData } from './App';

const OtherProfile = () => {
    const [user, setUser] = useState<UserData>({});

    useEffect(() => {
        let abort;
        (async () => {
            const { id } = useParams<{ id: string }>();
            const { data } = await axios.get(`/user/other-user/${id}`);
            if (!abort) {
                setUser(data.user);
            }
        })();
        return () => {
            abort = true;
        };
    }, []);

    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Other Profile for user {user.first}</h1>
        </div>
    );
};

export default OtherProfile;
