import React, { useContext } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Credentials from './components/Credentials';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from './pages/Layout';
import { Context } from './store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const users = useContext(Context).users;
    const token = useContext(Context).token;

    let initPage = <CircularProgress />;

    if (users.length > 0) {
        initPage = (
            <>
                <Credentials></Credentials>
                <Login title="Login" buttonTitle="Sign In"></Login>
            </>
        );
    }

    if (token) {
        initPage = (
            <>
                <Dashboard></Dashboard>
            </>
        );
    }

    return (
        <Layout>
            <ToastContainer />
            {initPage}
        </Layout>
    );
};

export default App;
