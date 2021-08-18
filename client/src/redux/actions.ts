import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState, UserType } from './reducer';

type ActionCreator = ThunkAction<void, RootState, unknown, Action<string>>;

export const getFriendsList =
    (): ActionCreator =>
    async (dispatch: Dispatch): Promise<Action> => {
        const { data } = (await axios
            .get('/friendship/friends-list')
            .catch((err) => console.log('err getting friends list: ', err))) as { data: UserType[] };
        return dispatch({
            type: 'friends/get-friends-list',
            payload: {
                users: data,
            },
        });
    };

export const acceptPendingRequest =
    (id: string): ActionCreator =>
    async (dispatch: Dispatch): Promise<Action> => {
        await axios.post(`/friendship/accept-friend/${id}`).catch((err) => console.log('err accepting request: ', err));
        return dispatch({
            type: 'friends/accept-friend',
            payload: {
                id,
            },
        });
    };

export const removeFriend =
    (id: string): ActionCreator =>
    async (dispatch: Dispatch): Promise<Action> => {
        await axios
            .post(`/friendship/end-friendship/${id}`)
            .catch((err) => console.log('err ending friendship: ', err));
        return dispatch({
            type: 'friends/remove-friend',
            payload: {
                id,
            },
        });
    };

export const getMessages =
    (mgs: any[]): ActionCreator =>
    async (dispatch: Dispatch): Promise<Action> =>
        dispatch({
            type: 'chat/get_messages',
            payload: mgs,
        });

export const chatMessage =
    (msg: any): ActionCreator =>
    async (dispatch: Dispatch): Promise<Action> =>
        dispatch({
            type: 'chat/chat_message',
            payload: msg,
        });
