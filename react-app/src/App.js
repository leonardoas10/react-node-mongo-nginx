import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Credentials from './components/Credentials';
import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {
    const [credentials, setCredentials] = useState([]);
    const [token, setToken] = useState('');
    const [circular, setCircular] = useState(true);

    useEffect(async () => {
        try {
            const { data } = await axios.get('/api/fake-data');
            await setCredentials(data.fakeData);
            setCircular(false);
        } catch (error) {
            console.error('Error => ', error);
        }
    }, []);

    const retrieveToken = async (tk) => {
        try {
            console.log('token from nodejs => ', tk);
            await setToken(tk);
        } catch (error) {
            console.error('retrieveToken() => ', error);
        }
    };

    const handleLogout = async () => {
        try {
            console.log('Clean token');
            await setToken('');
        } catch (error) {
            console.error('logout() => ', error);
        }
    };

    let initPage = <CircularProgress />;

    if (credentials.length > 0) {
        initPage = (
            <>
                <Credentials credentials={credentials}></Credentials>
                <Login
                    title="Login"
                    buttonTitle="Sign In"
                    sendToken={retrieveToken}
                ></Login>
            </>
        );
    }

    if (token) {
        initPage = (
            <>
                <Dashboard logout={handleLogout}></Dashboard>
            </>
        );
    }

    return <>{initPage}</>;
};

export default App;
