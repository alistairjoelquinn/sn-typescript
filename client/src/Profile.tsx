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

export const ProfilePageStyles = styled.div`
    width: 100%;
    max-height: 70vh;
    padding: 5vh 10vw;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 2fr;
    gap: 2rem;
    color: antiquewhite;
    & > div {
        width: 100%;
        max-height: 50vh;
        background-color: antiquewhite;
        border-radius: 1rem;
        color: black;
        padding: 3rem;
        display: grid;
        grid-template-rows: 1fr 2fr;
        p {
            font-size: 4rem;
        }
    }
    img {
        object-fit: cover;
        width: 100%;
        max-height: 80%;
        border: 3px solid antiquewhite;
        border-radius: 1rem;
    }
`;

const Profile = ({ first, last, image, bio, toggleModal, updateBioFromApp }: Props) => (
    <ProfilePageStyles>
        <ProfilePic first={first} last={last} image={image} toggleModal={toggleModal} />
        <div>
            <p>
                {first} {last}
            </p>
            <BioEditor bio={bio} updateBioFromApp={updateBioFromApp} />
        </div>
    </ProfilePageStyles>
);

export default Profile;
