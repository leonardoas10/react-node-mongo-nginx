const Credentials = ({ credentials }) => {
    return (
        <div>
            <span>
                Data from Mongo DB:
                <ul>
                    {credentials.map((dt) => (
                        <li>
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
