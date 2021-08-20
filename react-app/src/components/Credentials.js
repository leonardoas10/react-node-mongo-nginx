import { useContext } from 'react';
import { Context } from '../store/store';

const Credentials = () => {
    const credentials = useContext(Context).users;
    return (
        <div>
            <span>
                Data from Mongo DB:
                <ul>
                    {credentials.map((dt) => (
                        <li key={dt._id}>
                            <strong>Name: {dt.username} | </strong>
                            <strong>Password: {dt.password}</strong>
                        </li>
                    ))}
                </ul>
            </span>
        </div>
    );
};

export default Credentials;
