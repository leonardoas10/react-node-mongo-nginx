import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Credentials from './components/Credentials';

const App = () => {
    const [credentials, setCredentials] = useState([]);
    const [token, setToken] = useState('');

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

    useEffect(async () => {
        try {
            const { data } = await axios.get('/api/fake-data');
            console.log('INIT DATA => ', data.fakeData);
            await setCredentials(data.fakeData);
        } catch (error) {
            console.error('Error => ', error);
        }
    }, []);

    let initPage = (
        <>
            <Credentials credentials={credentials}></Credentials>
            <Login
                title="Login"
                buttonTitle="Sign In"
                sendToken={retrieveToken}
            ></Login>
        </>
    );

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
