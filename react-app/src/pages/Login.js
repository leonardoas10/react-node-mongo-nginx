import React, { useState, useEffect } from 'react';
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

const Login = ({ title, buttonTitle }) => {
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
            const response = await axios.post('/api/fake-data/login', {
                username: auth.username,
                password: auth.password,
            });
            console.log('response => ', response.data);
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
