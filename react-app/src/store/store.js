import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Context = React.createContext({
    users: [],
    token: '',
    userId: '',
    retrieveTokenAndUserId: (tk, userId) => {},
    handleLogout: () => {},
    handleUserEdit: (payload) => {},
});

export default (props) => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    useEffect(async () => {
        try {
            const { data } = await axios.get('/api/fake-data');
            await setUsers(data.fakeData);
        } catch (error) {
            console.error('Error => ', error);
        }
    }, [users]);

    const retrieveTokenAndUserId = async (tk, userId) => {
        try {
            await setUserId(userId);
            await setToken(tk);
        } catch (error) {
            console.error('retrieveTokenAndUserId() => ', error);
        }
    };

    const handleUserEdit = async (payload) => {
        const response = await axios.post('api/fake-data/edit-user', {
            payload,
        });
        console.log('Response => ', response.data);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            await setToken('');
            await setUserId('');
        } catch (error) {
            console.error('logout() => ', error);
        }
    };

    return (
        <Context.Provider
            value={{
                users: users,
                token: token,
                userId: userId,
                retrieveTokenAndUserId: retrieveTokenAndUserId,
                handleUserEdit: handleUserEdit,
                handleLogout: handleLogout,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
