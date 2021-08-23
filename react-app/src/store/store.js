import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Context = React.createContext({
    users: [],
    token: '',
    userId: '',
    retrieveTokenAndUserId: (tk, userId) => {},
    handleLogout: () => {},
    handleUserEdit: (payload) => {},
    customModalEditOpen: false,
    handleCustomModalEditOpen: () => {},
    toastrNotify: (message, type) => {},
    getUsers: () => {},
});

export default (props) => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [customModalEditOpen, setCustomModalEditOpen] = useState(false);
    const [expiryDate, setExpiryDate] = useState(
        localStorage.getItem('expiryDate')
    );

    useEffect(() => {
        try {
            if (new Date(expiryDate) <= new Date()) {
                console.log('leo');
                handleLogout(true);
            } else {
                setAutoLogout(expiryDate);
            }
            getUsers();
        } catch (error) {
            console.error('Error => ', error);
        }
    }, []);

    const getUsers = async () => {
        try {
            const { data } = await axios.get('/api/fake-data');
            await setUsers(data.fakeData);
        } catch (error) {
            console.error('Error getUsers() => ', error);
        }
    };

    const toastrNotify = (message, type) => {
        try {
            toast(message, { type: type });
        } catch (error) {
            console.error('Error toastrNotify () => ', error);
        }
    };

    const retrieveTokenAndUserId = async (tk, userId) => {
        try {
            await setUserId(userId);
            await setToken(tk);
        } catch (error) {
            console.error('retrieveTokenAndUserId() => ', error);
        }
    };

    const handleUserEdit = async (payload) => {
        try {
            const { data } = await axios.post('api/fake-data/edit-user', {
                payload,
            });
            let userIndex = users.findIndex(
                (user) => user._id == data.user._id
            );
            const updatedUsers = [...users];
            updatedUsers[userIndex] = data.user;
            await setUsers(updatedUsers);
            toastrNotify('Edit User Succesfull', 'success');
            handleCustomModalEditOpen();
        } catch (error) {
            toastrNotify('No Data for Edit User', 'error');
            console.error('handleUserEdit() => ', error);
        }
    };

    const handleCustomModalEditOpen = () => {
        setCustomModalEditOpen(!customModalEditOpen);
    };

    const handleLogout = async (usingUseEffect = false) => {
        try {
            if (!usingUseEffect) {
                toastrNotify('Bye bye! See ya!', 'success');
            }
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expiryDate');
            await setToken('');
            await setUserId('');
            await setExpiryDate('');
        } catch (error) {
            console.error('logout() => ', error);
        }
    };

    const setAutoLogout = (milliseconds) => {
        setTimeout(() => {
            handleLogout(true);
        }, milliseconds);
    };

    return (
        <Context.Provider
            value={{
                users,
                token,
                userId,
                retrieveTokenAndUserId,
                handleUserEdit,
                handleLogout,
                customModalEditOpen,
                handleCustomModalEditOpen,
                toastrNotify,
                getUsers,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
