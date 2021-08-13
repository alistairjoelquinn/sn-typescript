export const demoActionCreator = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    const values = await axios.get('/values');
    dispatch({
        type: 'some-type',
        payload: 'some-payload',
    });
};
