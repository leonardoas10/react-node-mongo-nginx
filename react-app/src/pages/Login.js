import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
    LoginCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    Button: {
        marginTop: '10px',
    },
});

const submit = () => {
    console.error('I love Grecia Aponte!');
};

const Login = ({ children, title, buttonTitle }) => {
    const classes = useStyles();
    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent className={classes.LoginCardContent}>
                    <Typography align="center" variant="h5" color="primary">
                        {title}
                    </Typography>
                    <TextField id="standard-basic" label="Username" />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                        onClick={submit}
                    >
                        {buttonTitle}
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
