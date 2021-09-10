import React, { useDebugValue, useEffect } from 'react';
import clsx from 'clsx';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LayersIcon from '@material-ui/icons/Layers';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import { green, pink } from '@material-ui/core/colors';
import {
    clearToken, setCustomTheme, clearAuthReducer, clearScreen, clearAssignRoleState,
    clearAcessScreen, clearCustomeTheme, fieldlanguage, FiledGetAllLanguageThunk,
    languageUserUpdateThunk, getUserDataByIdThunk
} from 'generic';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageSelect } from './LanguageSelect';
import { useUserData } from '../hooks/useUserData'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        // width: '100%',
        // direction: 'rtl'
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    toolbar: {
        paddingRight: 24,// keep right padding when drawer closed


    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        direction: 'rtl',
        ...theme.mixins.toolbar,
    },
    appBarIndex: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,

        }),
    },
    appBar: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,

        }),
        changelanguagedawar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        changelanguagedawa2: {
            zIndex: theme.zIndex.drawer
        },
    },
    appBarShift: {
        //  width:1700,

        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,

        }),
    },
    menuButton: {
        marginRight: 36,

    },
    menuButtonLeft: {
        marginLeft: 36,

    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerDarkColor: {
        backgroundColor: '#222426',
    },
    drawerBlueColor: {
        backgroundColor: '#3f51b5',
    },

    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        color: '#fff',
        fontWeight: '600',
        letterSpacing: 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {

        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        // flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        color: '#fff'
    },
    fixedHeight: {
        height: 240,
    },
    avatar: {
        marginRight: 120,
    },
    rightMenu: {

    },
    leftMenu: {

    }
}));




export const AppConainer = ({ children, screename, value, onForceRender, screen_name }) => {
    const screenByRole = useSelector(state => state.screenReducer.screensbyRole);
    const getTheme = useSelector(state => state.customThemeReducer.newTheme);
    const userDetailSelector = useSelector((state) => state.userReducer.userDetail);
    // const languageList = useSelector((state) => state.languageReducer.language);
    const languageList = useSelector((state) => state.languageReducer.fieldgetall);
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [menu, setMenu] = React.useState(null);
    const [zIndex, setZIndex] = React.useState(false);
    const userID = useUserData();
    const userData = useUserData();
    const [forceRender, setForceRender] = React.useState(false);

    const darkTheme = createMuiTheme({
        palette: {
            type: getTheme
        }
    });

    const getLanguageOrientation = () => {
        if (languageList !== undefined && languageList !== null && Object.keys(languageList).length !== 0) {
            const filterUser = languageList.filter(i => i.lang_id === userDetailSelector?.langId);
            console.log({ getLanguageOrientation: filterUser })
            if (filterUser.length > 0) {
                return filterUser[0].lang_orientation;
            }
        }
        return 'LTR';
    }

    useEffect(() => {
        const selectedLang = getLanguageOrientation();
        console.log(selectedLang)
        document.body.dir = selectedLang;
    }, [userDetailSelector, forceRender]);

    const handleChange = () => {
        if (getTheme === 'light') {
            dispatch(setCustomTheme('dark'))
        } else {
            dispatch(setCustomTheme('light'))
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setMenu(event.currentTarget)
    }

    const handleClosemenu = () => {
        setMenu(null);
    }


    const userlogout = async () => {
        const token = window.localStorage.getItem('token')
        const data = {
            id: parseInt(userID.id)
        }
        try {
            const response = await fetch(`http://smartsoft06-001-site2.ftempurl.com/api/UserLogin/logout/${data.id}`, {
            // const response = await fetch(`https://localhost:44308/api/UserLogin/logout/${data.id}`, {
                method: 'POST',
                headers: {
                    CompanyId: 1,
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ``
                },
                body: data ? JSON.stringify(data) : null,

            });
            console.log({ response })
            return response;

        } catch (error) {
            return error;
        }
    }

    const onLanguageClick = async ({ item }) => {
        setForceRender(s => !s)
        const token = window.localStorage.getItem('token');
        if (userData === null)
            return;

        const data = {
            lang_id: item.lang_id,
            user_id: userData.id
        };
        const result = await dispatch(languageUserUpdateThunk({ data, token }));
        if (result.payload === "Language Updated") {
            const user = await fetchUserData();
            if (user !== null && user !== undefined) {
                const langId = user.payload?.langId;
                fetchFields(langId);
            }
            if (item.lang_orientation === "RTL") {
                setZIndex(true)
            } else {
                setZIndex(false)
            }
        }

    };

    const fetchUserData = async () => {
        if (userData !== null) {
            const result = await dispatch(getUserDataByIdThunk({ id: userData.id }))
            return result;
        }
        return null;
    }


    const fetchFields = async (id) => {
        const token = window.localStorage.getItem('token')
        const lang_id = id;
        const result = await dispatch(FiledGetAllLanguageThunk(lang_id, token));

        console.log("result", result)
        return result;
    };




    const renderField = (value) => {
        let screenName = value;
        if (langField) {
            let filterField = langField.filter(i => i.field === value)
            if (filterField.length > 0) {
                screenName = filterField[0].description
            }
        };
        return screenName
    }

    const renderScreen = () => {
        let screenName;
        if (langField) {
            let filterField = langField.filter(i => i.field === 'Logout');
            if (filterField.length > 0) {

                screenName = filterField[0].description;
            } else {
                screenName = 'Logout';
            }
        } else {
            screenName = 'Logout';
        }


        const screen = screenByRole.screens.map((item) => {
            let screenName;
            if (langField) {
                let filterField = langField.filter(i => i.field === item.screenName);
                if (filterField.length > 0) {
                    screenName = filterField[0].description;
                } else {
                    screenName = item.screenName;
                }

            } else {
                screenName = item.screenName;
            }

            return (

                <ListItem button
                    key={item.id}
                    onClick={(event) => {
                        event.preventDefault();
                        history.push(item.screenUrl)
                    }}>
                    <ListItemIcon>
                        <FiberManualRecordIcon style={{ color: '#fff', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={screenName} />
                </ListItem>


            )

        });


        return (
            <>

                {screen}
                <ListItem button
                    onClick={() => {
                        userlogout();
                        dispatch(clearToken())
                        dispatch(clearAuthReducer())
                        // dispatch(clearUserState())
                        dispatch(clearScreen())
                        dispatch(clearAssignRoleState())
                        dispatch(clearAcessScreen())
                        // dispatch(clearLanguage())
                        dispatch(clearCustomeTheme())
                        localStorage.clear()
                        history.push('/Login')

                    }}>


                    <ListItemIcon>
                        <LayersIcon style={{ color: '#fff', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={screenName} />
                </ListItem>
            </>
        )
    }

    return (
        <ThemeProvider theme={darkTheme}>

            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute"
                    style={{ width: '100%' }}
                    className={clsx(zIndex ? classes.appBar : classes.appBarIndex,
                        open && classes.appBarShift,
                        getTheme === 'dark' ? classes.drawerDarkColor : classes.drawerBlueColor)}>
                    <Toolbar className={classes.toolbar} >
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {/* {screename} */}
                        </Typography>

                        <LanguageSelect onLanguageClick={onLanguageClick} />
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="primary">
                            <Avatar style={{ marginLeft: 10 }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.pink}>
                                <PersonIcon />
                            </Avatar>
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            style={{ marginTop: 45 }}
                            anchorEl={menu}
                            keepMounted
                            open={Boolean(menu)}
                            onClose={handleClosemenu}
                        >
                            <MenuItem onClick={handleClosemenu}>{renderField('Profile')} </MenuItem>
                            <MenuItem onClick={handleClosemenu}>{renderField('Setting')}</MenuItem>
                            <MenuItem onClick={handleClosemenu}>{renderField('Message Box')}</MenuItem>
                            <MenuItem onClick={handleClosemenu}>{renderField('Activities')}</MenuItem>
                            <MenuItem onClick={handleClosemenu}>{renderField('Feeds')}</MenuItem>
                            <MenuItem onClick={handleClosemenu}>{renderField('Search')}</MenuItem>
                            <MenuItem >{renderField('Dark Mode')}
                                <FormControlLabel
                                    style={{ marginLeft: 1 }}
                                    control={
                                        <Switch
                                            checked={getTheme === 'dark' ? true : false}
                                            onChange={handleChange}
                                            name="chackedB"
                                            color="primary"
                                        />
                                    }

                                />

                            </MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
                <Drawer bd={'red'}
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper,
                            !open && classes.drawerPaperClose,
                            getTheme === 'dark' ? classes.drawerDarkColor : classes.drawerBlueColor),
                    }}
                    open={open}>
                    <div className={classes.toolbarIcon}>
                        {
                            open ?

                                <>
                                    <Avatar variant="square" className={classes.avatar}>
                                        B
                                    </Avatar>
                                    <IconButton onClick={handleDrawerClose}>
                                        <ChevronLeftIcon />
                                        {/* <ChevronRightIcon /> */}
                                    </IconButton>
                                </>
                                :
                                <IconButton
                                    style={{ marginLeft: 8 }}
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                // className={clsx(!zIndex ? classes.menuButton : classes.menuButtonLeft, open && classes.menuButtonHidden,)}
                                >

                                    <MenuIcon />
                                </IconButton>
                        }
                    </div>
                    <Divider />
                    <List>


                        <div>
                            {screenByRole.screens && renderScreen()}


                        </div>
                    </List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {children}
                </main>
            </div>


        </ThemeProvider>
    );
}
