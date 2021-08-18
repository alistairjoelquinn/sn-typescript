import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ChatMessage } from '../Chat';
import { RootState } from '../start';
import { UserType } from './reducer';

export type AppThunk = ThunkAction<Promise<any>, RootState, unknown, AnyAction>;

export const getFriendsList = (): AppThunk => async (dispatch) => {
    const { data } = (await axios
        .get('/friendship/friends-list')
        .catch((err) => console.log('err getting friends list: ', err))) as { data: UserType[] };
    dispatch({
        type: 'friends/get-friends-list',
        payload: {
            users: data,
        },
    });
};

export const acceptPendingRequest =
    (id: string): AppThunk =>
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
    (id: string): AppThunk =>
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

export const getMessages =
    (mgs: ChatMessage[]): AppThunk =>
    async (dispatch) =>
        dispatch({
            type: 'chat/get_messages',
            payload: mgs,
        });

export const chatMessage =
    (msg: ChatMessage): AppThunk =>
    async (dispatch) =>
        dispatch({
            type: 'chat/chat_message',
            payload: msg,
        });
