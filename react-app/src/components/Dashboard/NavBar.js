import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import {
    AppBar,
    Typography,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Box,
    Link,
} from '@material-ui/core/';
import { Context } from '../../store/store';

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
    ListItem: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
    MenuItem: {
        textTransform: 'capitalize',
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);
    const [userIcon, setUserIcon] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const handleLogout = useContext(Context).handleLogout;
    const userId = useContext(Context).userId;
    const getUsers = useContext(Context).getUsers;

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
                                <ListItem
                                    className={classes.ListItem}
                                    onClick={getUsers}
                                >
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
                    <Box className={classes.menuButton}>
                        <Link
                            href={
                                process.env.REACT_APP_KD_URL
                                    ? process.env.REACT_APP_KD_URL
                                    : 'https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/'
                            }
                            color="inherit"
                            target="_blank"
                        >
                            <Typography variant="h6">K8S Dashboard</Typography>
                        </Link>
                    </Box>
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
