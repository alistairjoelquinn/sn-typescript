import axios from 'axios';
import { useEffect, useState } from 'react';

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
            const { data }: { data: Data } = await axios.post(`/friednship/add-friend/${otherUserId}`);
            setFriendshipId(data.id);
            setButtonText('Cancel Request');
        } else if (buttonText === 'Cancel Request') {
            await axios.post(`/end-friendship/${friendshipId}`);
            setFriendshipId(null);
            setButtonText('Add Friend');
        } else if (buttonText === 'Accept Request') {
            const { data }: { data: Data } = await axios.post(`/friednship/accept-friend/${friendshipId}`);
            setFriendshipId(data.id);
            setButtonText('Remove Friend');
        } else if (buttonText === 'Remove Friend') {
            await axios.post(`/friednship/end-friendship/${friendshipId}`);
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
                } else if (data.accepted === false && data.receiver_id === otherUserId) {
                    setButtonText('Cancel Request');
                } else if (data.accepted === false) {
                    setButtonText('Accept Request');
                } else if (data.accepted === true) {
                    setButtonText('Remove Friend');
                }
            })
            .catch(console.log);
    }, []);

    return (
        <div>
            <button onClick={buttonClickHandler} type="button">
                {buttonText}
            </button>
        </div>
    );
};

export default FriendButton;
