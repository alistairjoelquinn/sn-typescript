interface Action {
    type: string;
    payload: any;
}

const defaultState = {
    testing: 'Hello world',
};

export function reducer(state = defaultState, action: Action) {
    console.log('action: ', action);
    return state;
}
