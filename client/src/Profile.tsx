import ProfilePic from './ProfilePic';
import BioEditor from './BioEditor';

interface Props {
    first: string;
    last: string;
    image: string;
    bio: string;
    toggleModal: () => void;
    updateBioFromApp: (newBio: string) => void;
}

const Profile: React.FC<Props> = ({ first, last, image, bio, toggleModal, updateBioFromApp }) => (
    <div>
        <ProfilePic first={first} last={last} image={image} toggleModal={toggleModal} />
        <BioEditor bio={bio} updateBioFromApp={updateBioFromApp} />
    </div>
);

export default Profile;
