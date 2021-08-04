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
    const profileimage =
        userData.image || 'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png';

    const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.setAttribute(
            'src',
            'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png',
        );
    };

    return (
        <img
            onClick={toggleModal}
            src={profileimage}
            alt={`${userData.first} ${userData.last}`}
            onError={(e) => imageDefault(e)}
        />
    );
};

export default ProfilePic;
