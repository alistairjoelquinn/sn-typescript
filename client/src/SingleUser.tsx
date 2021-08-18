import { Link } from 'react-router-dom';

import { User } from './FindPeople';

const imageDefault = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.setAttribute('src', 'animal.jpeg');
};

const SingleUser = ({ user }: { user: User }) => (
    <div key={user.id} className="single-user">
        <Link to={`/user/${user.id}`}>
            <img src={user.image} alt={user.first} onError={imageDefault} />
        </Link>
        <div>
            {user.first} {user.last}
        </div>
    </div>
);

export default SingleUser;
