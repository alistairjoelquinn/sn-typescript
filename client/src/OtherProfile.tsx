import { useParams } from 'react-router';

const OtherProfile = () => {
    const { id } = useParams<{ id: string }>();
    console.log('id: ', id);

    return (
        <div>
            <h1>Other Profile for user {id}</h1>
        </div>
    );
};

export default OtherProfile;
