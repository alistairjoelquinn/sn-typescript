import styled from 'styled-components';
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

const ProfilePageStyles = styled.div`
    width: 100%;
    padding: 5vh 10vw;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    color: antiquewhite;
    img {
        width: 100%;
        border: 3px solid antiquewhite;
        border-radius: 1rem;
    }
`;

const Profile: React.FC<Props> = ({ first, last, image, bio, toggleModal, updateBioFromApp }) => (
    <ProfilePageStyles>
        <ProfilePic first={first} last={last} image={image} toggleModal={toggleModal} />
        <BioEditor bio={bio} updateBioFromApp={updateBioFromApp} />
    </ProfilePageStyles>
);

export default Profile;
