import { UserData } from '../App';

interface Action {
    type: string;
    payload: any;
}

export interface RootState {
    users: UserData[];
}

const initialState: RootState = {
    users: [],
};

export function reducer(state = initialState, action: Action) {
    console.log('action: ', action);
    return state;
}
