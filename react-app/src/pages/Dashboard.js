import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Dashboard = ({ logout }) => {
    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);
    const clickLogout = () => {
        try {
            logout();
        } catch (error) {
            console.error('clickLogout () => ', error);
        }
    };

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <Drawer
                                open={drawer}
                                onClose={toggleDrawer}
                            ></Drawer>
                            <MenuIcon onClick={toggleDrawer} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Learning K8S & Docker
                        </Typography>
                        <Button onClick={clickLogout} color="inherit">
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
            <h1>Leonardo Dashboard</h1>
        </>
    );
};

export default Dashboard;
