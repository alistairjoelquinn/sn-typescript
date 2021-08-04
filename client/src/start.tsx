import axios from 'axios';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';

axios.get('/user/id.json').then(({ data }) => {
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector('main'));
    } else {
        ReactDOM.render(
            <img src="/logo.gif" alt="logo" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} />,
            document.querySelector('main'),
        );
    }
});
