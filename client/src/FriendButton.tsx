import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
    otherUserId: string;
}

const FriendButton = ({ otherUserId }: Props) => {
    const [buttonText, setButtonText] = useState<string>(' ');

    useEffect(() => {
        axios
            .get(`/get-initial-status/${otherUserId}`)
            .then((res) => {
                console.log('res: ', res);
            })
            .catch(console.log);
    }, []);

    return (
        <div>
            <button type="button">Add Friend</button>
        </div>
    );
};

export default FriendButton;
