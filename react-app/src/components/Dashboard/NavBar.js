import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    AccountCircleIcon: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
    MenuItem: {
        textTransform: 'capitalize',
    },
}));

const NavBar = ({ userId, handleLogout }) => {
    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);
    const [userIcon, setUserIcon] = useState(null);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(async () => {
        try {
            const { data } = await axios.post('/api/fake-data/user', {
                userId: userId,
            });
            await setUserInfo(data.user);
        } catch (error) {
            console.error('Error useEffect NavBar => ', error);
        }
    }, []);

    const clickLogout = () => {
        try {
            handleLogout();
        } catch (error) {
            console.error('clickLogout () => ', error);
        }
    };

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const handleUserIcon = (event) => {
        setUserIcon(event.currentTarget);
    };

    const handleUserIconClose = () => {
        setUserIcon(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <Drawer open={drawer} onClose={toggleDrawer}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <PersonIcon></PersonIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Users" />
                                </ListItem>
                            </List>
                        </Drawer>
                        <MenuIcon onClick={toggleDrawer} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Learning K8S & Docker
                    </Typography>
                    <AccountCircleIcon
                        onClick={handleUserIcon}
                        className={classes.AccountCircleIcon}
                    ></AccountCircleIcon>
                    <Menu
                        id="simple-menu"
                        anchorEl={userIcon}
                        keepMounted
                        open={Boolean(userIcon)}
                        onClose={handleUserIconClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        getContentAnchorEl={null}
                    >
                        <MenuItem
                            onClick={clickLogout}
                            className={classes.MenuItem}
                        >
                            {userInfo.username}
                        </MenuItem>
                        <MenuItem
                            className={classes.MenuItem}
                            onClick={clickLogout}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
