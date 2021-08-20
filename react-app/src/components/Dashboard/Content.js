import React, { useState, useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import UsersTable from './UsersTable';
import { Context } from '../../store/store';

const Content = () => {
    const users = useContext(Context).users;
    const circular = useState(users ? false : true)[0];

    let usersTable = <CircularProgress />;

    if (!circular) {
        usersTable = <UsersTable rows={users} />;
    }

    return <>{usersTable}</>;
};

export default Content;
