import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducer';

type ActionCreator = ThunkAction<void, RootState, unknown, Action<string>>;

export const getFriendsList = (): ActionCreator => async (dispatch) => {
    const { data } = (await axios
        .get('/friendship/friends-list')
        .catch((err) => console.log('err getting friends list: ', err))) as { data: any[] };
    dispatch({
        type: 'friends/get-friends-list',
        payload: {
            users: data,
        },
    });
};

export const acceptPendingRequest =
    (id: string): ActionCreator =>
    async (dispatch) => {
        await axios.post(`/friendship/accept-friend/${id}`).catch((err) => console.log('err accepting request: ', err));
        dispatch({
            type: 'friends/accept-friend',
            payload: {
                id,
            },
        });
    };

export const removeFriend =
    (id: string): ActionCreator =>
    async (dispatch) => {
        await axios
            .post(`/friendship/end-friendship/${id}`)
            .catch((err) => console.log('err ending friendship: ', err));
        dispatch({
            type: 'friends/remove-friend',
            payload: {
                id,
            },
        });
    };
