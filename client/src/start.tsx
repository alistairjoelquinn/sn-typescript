import axios from 'axios';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './redux/reducer';
import App from './App';
import Welcome from './Welcome';
import { init } from './socket.io/socket';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

axios.get('/auth/user/id.json').then(({ data }) => {
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector('main'));
    } else {
        init(store);
        const elem = (
            <Provider store={store}>
                <App />
            </Provider>
        );

        ReactDOM.render(elem, document.querySelector('main'));
    }
});
