interface Props {
    userData: UserData;
    toggleModal: () => void;
}

interface UserData {
    first: string;
    last: string;
    image: string;
}

const ProfilePic: React.FC<Props> = ({ userData, toggleModal }) => {
    userData.image = userData.image || 'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png';
    const imageDefault = (e: React.SyntheticEvent<HTMLImageElement> ) => {
        e.currentTarget.setAttribute('src', 'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png');
    };
    return (
        <div>
            <img
                onClick={toggleModal}
                src={userData.image}
                alt={`${userData.first} ${userData.last}`}
                onError={(e) => imageDefault(e)}
            />
        </div>
    );
}

export default ProfilePic;