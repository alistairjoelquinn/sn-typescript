interface Action {
    type: string;
    payload: any;
}

export function reducer(state = {}, action: Action) {
    console.log('action: ', action);
    return state;
}
