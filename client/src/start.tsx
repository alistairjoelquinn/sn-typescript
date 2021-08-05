import axios from 'axios';
import ReactDOM from 'react-dom';
import App from './App';
import Welcome from './Welcome';

axios.get('/auth/user/id.json').then(({ data }) => {
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector('main'));
    } else {
        ReactDOM.render(<App />, document.querySelector('main'));
    }
});
