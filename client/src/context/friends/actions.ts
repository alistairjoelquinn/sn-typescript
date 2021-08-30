import axios from "axios";
import { UserType } from "./context";
import { Action } from "./reducer";

export const getFriendsList = async (dispatch: React.Dispatch<Action>) => {
    const { data } = (await axios
        .get('/friendship/friends-list')
        .catch((err) => console.log('err getting friends list: ', err))) as { data: UserType[] };
    dispatch({
        type: 'GET_FRIENDS_LIST',
        payload: {
            users: data,
        },
    });
};

export const acceptPendingRequest = async (dispatch: React.Dispatch<Action>, id: string) => {
        await axios.post(`/friendship/accept-friend/${id}`).catch((err) => console.log('err accepting request: ', err));
        dispatch({
            type: 'ACCEPT_FRIEND',
            payload: {
                id,
            },
        });
    };

export const removeFriend = async (dispatch: React.Dispatch<Action>, id: string) => {
        await axios
            .post(`/friendship/end-friendship/${id}`)
            .catch((err) => console.log('err ending friendship: ', err));
        dispatch({
            type: 'REMOVE_FRIEND',
            payload: {
                id,
            },
        });
    };