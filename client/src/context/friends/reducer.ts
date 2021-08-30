import { initialState, UserType } from './context';

interface Payload {
    id?: string;
    users?: UserType[];
}

export interface Action {
    type: string;
    payload: Payload;
}

export const friendsReducer = (state = initialState, action: Action) => {
    if (action.type === 'GET_FRIENDS_LIST') {
        return {
            ...state,
            users: action.payload.users,
        };
    }
    if (action.type === 'ACCEPT_FRIEND') {
        return {
            ...state,
            users: state.users.map((user) => {
                if (user.friendshipId === action.payload.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                }
                return user;
            }),
        };
    }
    if (action.type === 'REMOVE_FRIEND') {
        return {
            ...state,
            users: state.users.map((user) => {
                if (user.friendshipId === action.payload.id) {
                    return {
                        ...user,
                        accepted: null,
                    };
                }
                return user;
            }),
        };
    }
    return state;
};
