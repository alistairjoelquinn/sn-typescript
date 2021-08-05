interface Props {
    first: string;
    last: string;
    image: string;
    toggleModal: () => void;
}

const ProfilePic: React.FC<Props> = ({ first, last, image, toggleModal }) => {
    const profileimage = image || 'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png';

    const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.setAttribute(
            'src',
            'https://alsimageuniverse.s3.amazonaws.com/jhHC3lw0fMcoDXJFxNpnk_6iFWpR92aG.png',
        );
    };

    return <img onClick={toggleModal} src={profileimage} alt={`${first} ${last}`} onError={(e) => imageDefault(e)} />;
};

export default ProfilePic;
