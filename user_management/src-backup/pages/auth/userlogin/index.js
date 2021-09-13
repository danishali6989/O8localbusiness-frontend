import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import { useCustomNotify } from '../../../components'
import { fetchScreensbyRole } from 'generic';
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode';
import { doLoginstep2 } from 'generic';
import { useDispatch } from 'react-redux';
// import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1604778368096-1ef9ada56c0a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjBhbmQlMjBsYXB0b3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },

    root: {
        width: '550px',
        margin: 'auto',
        padding: 10,
        position: 'relative',
        top: '30%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    form: {
        '& > *': {
            //   margin: theme.spacing(2,2,2),
            width: '100%',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),

    }

}));



export const Userlogin = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const CustomNotify = useCustomNotify();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [opt, setOtp] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const auth = useSelector((state) => state.accountReducer);
    const screenByRole = useSelector(state => state.screenReducer.screensbyRole);
    const logindata = useSelector(state => state.loginReducer.logindata.data);


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
            history.push(result.payload.screens[0].screenUrl);
        } else {
            CustomNotify("Invalid Credentials", "error");
        }

    }


    const loginstep2 = async () => {

        if (logindata.username !== "" && logindata.password !== "" && opt !== "") {
            // if (username !== "" && password !== "" && opt !== "") {
            setIsSubmit(true)
            const data = {
                username: logindata.username,
                password: logindata.password,
                otp: opt
            }
            console.log('data', data)
            const result = await dispatch(doLoginstep2({ data }))
            console.log("result", result.payload)
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

        setIsSubmit(false)

    }


    return (
        <div className={classes.image}>
            <Card className={classes.root}>
                <CardContent>
                    {
                        //   showOtp !== '' ? OtpComponent() :
                        <>
                            <Typography style={{ margin: '10px 0px' }}>User Login</Typography>


                            <form className={classes.form} noValidate autoComplete="off">

                                {/* <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="Username"
                                    autoComplete="username"
                                    autoFocus

                                    onChange={(e) => setUsername(e.target.value)}
                                /> */}
                                {/* <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    type="password"
                                    label="Password"
                                    autoComplete="password"
                                    autoFocus

                                    onChange={(e) => setPassword(e.target.value)}
                                /> */}

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="Enter OTP"
                                    autoComplete="otp"
                                    autoFocus

                                    onChange={(e) => setOtp(e.target.value)}
                                />


                            </form>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmit}
                                // disabled={loading}
                                className={classes.submit}
                                onClick={(event) => {
                                    event.preventDefault();
                                    loginstep2()
                                }}
                            >
                                {isSubmit ? <CircularProgress size={18} /> : 'Submit'}
                            </Button>
                        </>


                    }
                </CardContent>
            </Card>
        </div>
    )
}


