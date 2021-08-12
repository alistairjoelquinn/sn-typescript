import { useState } from 'react';

const Profile = () => {
    const [name, setName] = useState('');

    setName(1234);

    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

export default Profile;
