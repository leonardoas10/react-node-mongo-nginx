import React from 'react';
import NavBar from '../components/Dashboard/NavBar';
import Content from '../components/Dashboard/Content';

const Dashboard = ({ token, userId, handleLogout }) => {
    return (
        <>
            <NavBar userId={userId} handleLogout={handleLogout} />
            <Content />
        </>
    );
};

export default Dashboard;
