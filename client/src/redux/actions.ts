import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './reducer';

export const receiveRequestsFriends = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    const res = await axios.get('/requests-friends').catch((err) => console.log('err getting friends list: ', err));
    console.log('res: ', res);
    dispatch({
        type: 'RECEIVE_REQUESTS_FRIENDS',
        users: res,
    });
};

export const acceptRequestsPending =
    (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
        await axios.post(`/accept-friend/${id}`).catch((err) => console.log('err accepting request: ', err));
        dispatch({
            type: 'ACCEPT_FRIEND',
            id,
        });
    };

export const removeFriend =
    (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch) => {
        await axios.post(`/end-friendship/${id}`).catch((err) => console.log('err ending friendship: ', err));
        dispatch({
            type: 'REMOVE_FRIEND',
            id,
        });
    };
