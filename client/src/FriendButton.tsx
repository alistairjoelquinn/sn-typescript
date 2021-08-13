import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonStyles from './styles/ButtonStyles';

interface Props {
    otherUserId: string;
}

interface Data {
    id?: string;
}

const FriendButton = ({ otherUserId }: Props) => {
    const [buttonText, setButtonText] = useState<string>(' ');
    const [friendshipId, setFriendshipId] = useState<string>(' ');

    const buttonClickHandler = async () => {
        if (buttonText === 'Add Friend') {
            const { data }: { data: Data } = await axios.post(`/friendship/add-friend/${otherUserId}`);
            setFriendshipId(data.id);
            setButtonText('Cancel Request');
        } else if (buttonText === 'Cancel Request') {
            await axios.post(`/friendship/end-friendship/${friendshipId}`);
            setFriendshipId(null);
            setButtonText('Add Friend');
        } else if (buttonText === 'Accept Request') {
            await axios.post(`/friendship/accept-friend/${friendshipId}`);
            setButtonText('Remove Friend');
        } else if (buttonText === 'Remove Friend') {
            await axios.post(`/friendship/end-friendship/${friendshipId}`);
            setFriendshipId(null);
            setButtonText('Add Friend');
        }
    };

    useEffect(() => {
        axios
            .get(`/friendship/get-initial-status/${otherUserId}`)
            .then(({ data }) => {
                if (!data) {
                    setButtonText('Add Friend');
                } else {
                    setFriendshipId(data.id);
                    if (data.accepted === false && data.receiver_id === otherUserId) {
                        setButtonText('Cancel Request');
                    } else if (data.accepted === false) {
                        setButtonText('Accept Request');
                    } else if (data.accepted === true) {
                        setButtonText('Remove Friend');
                    }
                }
            })
            .catch(console.log);
    }, []);

    return (
        <div>
            <ButtonStyles onClick={buttonClickHandler} type="button">
                {buttonText}
            </ButtonStyles>
        </div>
    );
};

export default FriendButton;
