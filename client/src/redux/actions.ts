import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducer';

type ActionCreator = ThunkAction<void, RootState, unknown, Action<string>>;

export const getFriendsList = (): ActionCreator => async (dispatch) => {
    const res = await axios
        .get('/friendships/friends-list')
        .catch((err) => console.log('err getting friends list: ', err));
    console.log('res: ', res);
    dispatch({
        type: 'friends/get-friends-list',
        payload: {
            users: res,
        },
    });
};

export const acceptPendingRequest =
    (id: string): ActionCreator =>
    async (dispatch) => {
        await axios
            .post(`/friendships/accept-friend/${id}`)
            .catch((err) => console.log('err accepting request: ', err));
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
            .post(`/friendships/end-friendship/${id}`)
            .catch((err) => console.log('err ending friendship: ', err));
        dispatch({
            type: 'friends/remove-friend',
            payload: {
                id,
            },
        });
    };
