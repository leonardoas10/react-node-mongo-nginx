import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import UsersTable from './UsersTable';

const Content = () => {
    const [circular, setCircular] = useState(true);

    const [rows, setRows] = useState([]);

    useEffect(async () => {
        try {
            const { data } = await axios.get('/api/fake-data');
            await setRows(data.fakeData);
            setCircular(false);
        } catch (error) {
            console.error('Error => ', error);
        }
    }, []);

    let usersTable = <CircularProgress />;

    if (!circular) {
        usersTable = <UsersTable rows={rows} />;
    }

    return <>{usersTable}</>;
};

export default Content;
