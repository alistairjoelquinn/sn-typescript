import { UserData } from '../App';

interface Action {
    type: string;
    payload: any;
}

interface User extends UserData {
    accepted: boolean | null;
    friendshipId?: string;
}

export interface RootState {
    users: User[];
}

const initialState: RootState = {
    users: [],
};

export function reducer(state = initialState, action: Action) {
    if (action.type === 'friends/get-friends-list') {
        return {
            ...state,
            users: action.payload.users,
        };
    }
    if (action.type === 'friends/accept-friend') {
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
    if (action.type === 'friends/remove-friend') {
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
}
