import React, { useState } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    makeStyles,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
    LoginCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    Button: {
        marginTop: '10px',
    },
});

const Login = ({ title, buttonTitle, sendToken }) => {
    const classes = useStyles();
    const [auth, setAuth] = useState({
        username: '',
        password: '',
    });

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
            sendToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            // window.location.replace('/api/fake-data');
        } catch (error) {
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
