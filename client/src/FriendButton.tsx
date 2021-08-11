import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
    otherUserId: string;
    userId: string;
}

const FriendButton = ({ otherUserId, userId }: Props) => {
    const [buttonText, setButtonText] = useState<string>(' ');

    const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('e.target.value: ', event.currentTarget.innerText);
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
