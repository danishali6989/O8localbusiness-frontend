import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useCustomNotify } from '../../../components'
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from 'react-router-dom';
import { fetchScreensbyRole } from 'generic';
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode';
import { doLogin, doLoginstep1,setlogindata } from 'generic';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';





function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                User Management
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWRtaW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const Login = () => {
    const classes = useStyles();
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [status, setStatus] = useState(false)
    const dispatch = useDispatch()
    const CustomNotify = useCustomNotify();
    const recaptchaRef = React.createRef();
    const auth = useSelector((state) => state.accountReducer);
    const screenByRole = useSelector(state => state.screenReducer.screensbyRole);


    useEffect(() => {
        console.log({ auth, screenByRole })
        return () => {

        }
    }, [])

    const getScreensbyRole = async (token) => {
        const decoded = jwtDecode(token);
        const data = {
            id: decoded.RoleId,
            token: token
        }

        const result = await dispatch(fetchScreensbyRole(data));
        if (result.payload !== undefined) {
            console.log("getScreensbyRole", result.payload.screens[0].screenUrl)
            history.push(result.payload.screens[0].screenUrl);
        } else {
            CustomNotify("Invalid Credentials", "error");
        }

    }

    const login = async () => {

        // if (status) {
        if (username !== "" && password !== "") {

            setIsSubmit(true)

            const token = window.localStorage.getItem('token')
            const data = {
                username,
                password
            }
             
            const result = await dispatch(doLogin({ data, token }))
            const newresult = await dispatch(setlogindata({data}))
            if (result.payload !== undefined) {
                localStorage.setItem("token", result.payload);
                setIsSubmit(false);
                getScreensbyRole(result.payload);
            } else {

                CustomNotify("Invalid Credentials", "error");
            }
        } else {
            CustomNotify("Please provide username and password", "error");

        }

        // }


        setIsSubmit(false)

    }




    // const loginstep1 = async () => {

    //     if (status) {
    //         if (username !== "" && password !== "") {

    //             setIsSubmit(true)
    //             const data = {
    //                 username,
    //                 password
    //             }

    //             const result = await dispatch(doLoginstep1({ data }))
    //             console.log({ 'loginstep1': result })
    //             if (result.payload !== undefined) {
    //                 setIsSubmit(false);

    //                 CustomNotify("otp send", "success");
    //                 history.push('/Userlogin');
    //             } else {

    //                 CustomNotify("Invalid Credentials", "error");
    //             }
    //         } else {
    //             CustomNotify("Please provide username and password", "error");

    //         }

    //     }


    //     setIsSubmit(false)

    // }

    const handler = (value) => {
        console.log(value)
        setStatus(true)
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {/* <ReCAPTCHA

                            sitekey="6LcJp78bAAAAAEOtxDnl6BoADH6Nq12fe_vzLjof"
                            ref={recaptchaRef}
                            value={status}
                            onChange={handler}
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isSubmit}


                            onClick={(event) => {
                                event.preventDefault();
                                login()
                                // loginstep1()
                                // history.push('/Userlogin');
                            }}
                        >
                            {isSubmit ? <CircularProgress size={18} /> : 'submit'}

                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Typography
                                    onClick={(event) => {
                                        event.preventDefault();
                                        history.push('/ForgotPassword')
                                    }}
                                    style={{
                                        textTransform: 'capitalize',
                                        fontSize: 15, color: '#3f51b5',
                                        cursor: 'pointer'


                                    }}
                                    component="h1" variant="h5">
                                    Forget Password
                                </Typography>


                            </Grid>
                            {/* <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid> */}
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}