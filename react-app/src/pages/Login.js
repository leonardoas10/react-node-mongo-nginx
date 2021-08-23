import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    makeStyles,
} from '@material-ui/core';
import { Context } from '../store/store';

const useStyles = makeStyles({
    LoginCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    Button: {
        marginTop: '10px',
    },
});

const Login = ({ title, buttonTitle }) => {
    const classes = useStyles();
    const [auth, setAuth] = useState({
        username: '',
        password: '',
    });
    const retrieveTokenAndUserId = useContext(Context).retrieveTokenAndUserId;
    const toastrNotify = useContext(Context).toastrNotify;

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setAuth({ ...auth, [name]: value });
    };

    const submit = async () => {
        try {
            const { data } = await axios.post('/api/fake-data/login', {
                username: auth.username,
                password: auth.password,
            });
            setAuth({ username: '', password: '' });
            retrieveTokenAndUserId(data.token, data.userId);
            toastrNotify('Welcome to Learn K8S & Docker APP', 'success');
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            const remainingMilliseconds = 100000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
        } catch (error) {
            toastrNotify('No Data for Submit', 'error');
            console.error('Error submit() => ', error);
        }
    };
    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent className={classes.LoginCardContent}>
                    <Typography align="center" variant="h5" color="primary">
                        {title}
                    </Typography>
                    <TextField
                        id="standard-basic"
                        label="Username"
                        name="username"
                        value={auth.username}
                        onChange={handleOnChange}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={auth.password}
                        onChange={handleOnChange}
                    />
                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                        onClick={() => submit()}
                    >
                        {buttonTitle}
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
