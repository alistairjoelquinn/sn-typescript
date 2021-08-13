import { useSelector } from 'react-redux';

const Friends = () => {
    const test = useSelector((state) => state);

    console.log('test: ', test);

    return <div>Friends component</div>;
};

export default Friends;
