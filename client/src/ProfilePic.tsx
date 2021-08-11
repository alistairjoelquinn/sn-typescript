interface Props {
    first: string;
    last: string;
    image: string;
    toggleModal: () => void;
}

const ProfilePic = ({ first, last, image, toggleModal }: Props) => {
    const profileimage = image || 'animal.jpeg';

    const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.setAttribute('src', 'animal.jpeg');
    };

    return <img onClick={toggleModal} src={profileimage} alt={`${first} ${last}`} onError={(e) => imageDefault(e)} />;
};

export default ProfilePic;
