import { createContext, useContext, useReducer } from 'react';
import { User } from '../../FindPeople';
import { friendsReducer, Action } from './reducer';

export interface UserType extends User {
    accepted: boolean | null;
    friendshipId?: string;
}

export interface InitialState {
    users: UserType[];
}

export const initialState: InitialState = {
    users: [],
};

const FriendsStateContext = createContext<InitialState>({} as InitialState);
const FriendsDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export const useFriendsState = () => useContext(FriendsStateContext);
export const useFriendsDispatch = () => useContext(FriendsDispatchContext);

export const FriendsStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(friendsReducer, initialState);

    return (
        <FriendsStateContext.Provider value={state}>
            <FriendsDispatchContext.Provider value={dispatch}>{children}</FriendsDispatchContext.Provider>
        </FriendsStateContext.Provider>
    );
};
