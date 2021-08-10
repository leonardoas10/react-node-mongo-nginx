import React, { useState, useEffect } from 'react';
const Dashboard = (logout) => {
    return (
        <>
            <h1>Leonardo Dashboard</h1>
            <button onClick={() => logout}>Logout</button>
        </>
    );
};

export default Dashboard;
