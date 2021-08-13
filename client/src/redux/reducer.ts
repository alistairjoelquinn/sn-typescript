import { UserData } from '../App';

interface Action {
    type: string;
    payload: any;
}

interface User extends UserData {
    accepted: boolean;
}

export interface RootState {
    users: User[];
}

const initialState: RootState = {
    users: [],
};

export function reducer(state = initialState, action: Action) {
    if (action.type === 'RECEIVE_REQUESTS_FRIENDS') {
        return {
            ...state,
            users: action.payload.users,
        };
    }
    if (action.type === 'ACCEPT_FRIEND') {
        return {
            ...state,
            users: state.users.map((user) => {
                if (user.userId === action.payload.id) {
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
                if (user.userId === action.payload.id) {
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
