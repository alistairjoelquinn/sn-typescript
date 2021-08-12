interface Props {
    first: string;
    last: string;
    bio: string;
    image: string;
}

const Profile = ({ first, last, bio, image }: Props) => {
    console.log('first, last, bio, image: ', first, last, bio, image);

    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;
