import { Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { AppConainer } from '../../../components'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import { EmailSettingAddThunk, getAllEmailDetailsThunk, EmailSettingUpdateThunk, EmailSettingDeleteThunk, getScreenAccessByUserRoleIdThunk } from 'generic';
import { useCustomNotify } from '../../../components'
import { useUserData } from '../../../hooks/useUserData'









const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        //   width:1000,
        // marginLeft: -80

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        minWidth: 275,
        flexGrow: 1,
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
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    img: {
        width: "8rem",
        height: "8rem",
        marginTop: "-5rem",
        marginLeft: "rem",
    },
}));

export const Setting = () => {
    const dispatch = useDispatch();
    const CustomNotify = useCustomNotify();
    const classes = useStyles();
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [smtp, setSmtp] = useState('')
    const [description, setDescription] = useState('')
    const [portnumber, setPortnumber] = useState('')
    const [open, setOpen] = React.useState(false);
    const [hideShow, setHideShow] = useState(true)
    const [status, setStatus] = useState(true);
    const [newStatus, setNewStatus] = useState(true)
    const [emailData, setEmailData] = useState({
        email: '', password: '', smtp: '', desc: '', portNo: '', id: null
    })
    const EmailList = useSelector(state => state.emailSettingReducer);
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const userData = useUserData();
    const [accessList, setAccessList] = useState([]);

    console.log("emailID", emailData.id)

    console.log("datalist", EmailList)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const onPassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const onSmtp = (e) => {
        e.preventDefault()
        setSmtp(e.target.value)
    }

    const onDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }
    const onPortnumber = (e) => {
        e.preventDefault()
        setPortnumber(e.target.value)
    }

    useEffect(() => {
        emailGet();
    }, [])

    console.log('getAllEmailDetailsThunk', emailData)

    const emailGet = async () => {
        const result = await dispatch(getAllEmailDetailsThunk())

        if (result.payload !== undefined && result.payload.length > 0) {
            console.log("result>>>", result.payload);
            const data = result.payload[0];

            setEmailData(s => ({
                id: data.id,
                desc: data.description,
                password: data.password,
                email: data.email,
                portNo: data.portnumber,
                smtp: data.smtpNo
            }));
            setEmail(data.email)
            setDescription(data.description)
            setPassword(data.password)
            setPortnumber(data.portnumber)
            setSmtp(data.smtpNo)
            setHideShow(true);
            setNewStatus(false);
        } else {
            setHideShow(false);
            setNewStatus(true);
        }

        return result;
    }


    const settingEmail = async () => {

        const token = window.localStorage.getItem('token')
        const data = {
            email: Email,
            password: password,
            portnumber: portnumber,
            description: description,
            smtpNo: smtp,
        }

        const result = await dispatch(EmailSettingAddThunk({ data, token }));

        if (result.payload === "EmailSettings Added") {
            const getScreenData = await emailGet();
            const getListEmail = getScreenData.payload
            console.log("getListEmail", getListEmail)
            CustomNotify(renderField('Added Successfully'), "success");
        } else {
            CustomNotify(renderField('something went wrong'), "error");
        }

    }

    const updateEmail = async () => {
        const token = window.localStorage.getItem('token')
        const data = {
            id: emailData.id,
            email: Email,
            password: password,
            portnumber: portnumber,
            description: description,
            smtpNo: smtp,
        }
        console.log("SeenData", data)

        const result = await dispatch(EmailSettingUpdateThunk({ data, token }))
        console.log("UpdateResult", result)
        const getScreenData = await emailGet();
        const getListEmail = getScreenData.payload
        console.log("getListEmail", getListEmail)
        if (result.payload === "EmailSetting Updated") {

            CustomNotify(renderField('Updated Successfully'), "success");
        } else {
            CustomNotify(renderField('something went wrong'), "error");
        }
    }

    const emailDelete = async () => {
        const token = window.localStorage.getItem('token')
        let id = emailData.id
        console.log("deleteiID", id, token)
        const result = await dispatch(EmailSettingDeleteThunk({ id, token }))
        console.log("deleteResult", result)

        if (result.payload === "deleted") {
            const getScreenData = await emailGet();
            const getListEmail = getScreenData.payload
            console.log("getListEmail", getListEmail)
            CustomNotify(renderField('Deleted Successfully'), "success");

        } else {
            CustomNotify(renderField('something went wrong'), "error");
        }
    }


    const renderField = (value) => {
        let screenName = value;
        if (langField) {
            let filterField = langField.filter(i => i.field === value);
            if (filterField.length > 0) {
                console.log({ filterField })
                screenName = filterField[0].description;
            };
        };
        return screenName;
    };


    useEffect(() => {
        permiRolelist();
    }, [])

    const permiRolelist = async () => {
        const token = window.localStorage.getItem('token')
        const id = userData.RoleId;
        const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }));
        let getScreenId = result.payload.screens.filter((i) => i.screenName === "Setting");
        let filterAccessList = result.payload.permissions.filter((i) => i.screenId === getScreenId[0].screenId);
        setAccessList(filterAccessList)
    };

    const accessActionBtn = (btn) => {
        let accessBtn = accessList.find((i) => i.permin_title === btn);
        return accessBtn?false:true;
    }



    return (
        <AppConainer>
            <Container>

                {
                    newStatus &&

                    <Button variant="contained" color="primary" style={{ marginTop: 30 }} onClick={handleClickOpen} disabled={accessActionBtn('Add')}>
                        {renderField('ADD EMAIL')}
                    </Button>
                }

                {
                    hideShow ?
                        <div className={classes.root} style={{ paddingRight: "15rem" }}>
                            <Grid container spacing={3} style={{ width: "70rem" }}>
                                <Grid item xs={8} style={{ marginTop: "2rem", marginLeft: "12rem" }}>
                                    <Paper className={classes.paper} style={{ height: "26rem", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 2px 15px 0 rgba(0, 0, 0, 0.2)" }}>
                                        <Paper style={{ width: "42rem", height: "5rem", marginLeft: ".3rem", marginTop: "-4rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.4)", backgroundColor: "#3f51b5" }}>
                                            <div
                                                style={{ display: "flex", justifyContent: "space-between" }}
                                            >
                                                {status ? (
                                                    <Typography
                                                        variant="h5"
                                                        // color="secondary"
                                                        fontWeight="bold"
                                                        style={{ paddingTop: "1.5rem", paddingLeft: "1rem", paddingRight: "2rem", fontSize: "1.3rem", color: "white" }}
                                                    >
                                                        {renderField('Email Setting')}

                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        variant="h5"
                                                        color="secondary"
                                                        fontWeight="bold"
                                                        style={{ paddingTop: "1.5rem", paddingLeft: "1rem", paddingRight: "2rem", fontSize: "1.3rem", color: "white" }}
                                                    >
                                                        {renderField('Edit Email Setting')}
                                                    </Typography>
                                                )}

                                                <CardHeader
                                                    action={
                                                        status ? (
                                                            <>
                                                                <IconButton
                                                                    onClick={emailDelete}
                                                                >
                                                                    <DeleteOutline style={{ fontSize: "1.5rem", color: "white", marginTop: ".5rem" }} />
                                                                </IconButton>
                                                                <IconButton
                                                                    variant="contained"
                                                                    style={{
                                                                        textTransform: "capitalize",
                                                                        fontSize: 13,
                                                                    }}
                                                                    // color="primary"
                                                                    fontSize="large"
                                                                    // edge="start"
                                                                    // aria-label="open drawer"
                                                                    onClick={() => {
                                                                        setStatus(false);
                                                                    }}
                                                                   
                                                                >
                                                                    <Edit style={{ fontSize: "1.5rem", color: "white", marginTop: ".5rem" }} />
                                                                </IconButton>
                                                            </>
                                                        ) : (
                                                            <IconButton
                                                                edge="start"
                                                                aria-label="open drawer"
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={() => {
                                                                    setStatus(true);
                                                                }}
                                                                style={{ background: "danger" }}
                                                                // disabled={accessActionBtn('Delete Email')}
                                                            >
                                                                <CancelIcon style={{ background: "danger" }} />
                                                            </IconButton>
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Paper>
                                        <div style={{ marginTop: "2rem", width: 700, }}>
                                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                <div >
                                                    {status ?
                                                        <TextField className={classes.formControl}
                                                            id="outlined-basic" label={renderField("Email ")}
                                                            value={emailData.email}
                                                            variant="outlined"
                                                            style={{ width: 300 }}
                                                        />

                                                        : <Grid item xs={12}>
                                                            <TextField className={classes.formControl}
                                                                id="outlined-basic" label={renderField("Email ")}
                                                                onChange={onEmail}
                                                                defaultValue={emailData.email}
                                                                variant="outlined"
                                                                style={{ width: 300 }}
                                                            />
                                                        </Grid>}
                                                </div>
                                                <div>
                                                    {status ?


                                                        <TextField className={classes.formControl}
                                                            id="outlined-basic" label={renderField("Password")}
                                                            type="password"
                                                            value={emailData.password}
                                                            variant="outlined"
                                                            style={{ width: 300 }}
                                                        />
                                                        : <Grid item xs={12}>
                                                            <TextField className={classes.formControl}
                                                                id="outlined-basic" label={renderField("Password")}
                                                                onChange={onPassword}
                                                                defaultValue={emailData.password}
                                                                variant="outlined"
                                                                style={{ width: 300 }}
                                                            />
                                                        </Grid>}
                                                </div>
                                            </div>
                                            <div style={{ marginTop: "1rem", width: 700, }}>

                                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <div >
                                                        {status ?
                                                            <TextField className={classes.formControl}
                                                                id="outlined-basic"
                                                                label={renderField("Port Number")}
                                                                value={emailData.portNo}
                                                                variant="outlined"
                                                                style={{ width: 300 }}
                                                            />
                                                            : <Grid item xs={12}>
                                                                <TextField className={classes.formControl}
                                                                    id="outlined-basic" label={renderField("Port Number")}
                                                                    defaultValue={emailData.portNo}
                                                                    onChange={onPortnumber}
                                                                    variant="outlined"
                                                                    style={{ width: 300 }}
                                                                />
                                                            </Grid>}

                                                    </div>

                                                    <div >
                                                        {status ?
                                                            <TextField className={classes.formControl}
                                                                id="outlined-basic" label={renderField("SMTP")}
                                                                value={emailData.smtp}
                                                                variant="outlined"
                                                                style={{ width: 300 }}
                                                            />

                                                            : <Grid item xs={12}>
                                                                <TextField className={classes.formControl}
                                                                    id="outlined-basic" label={renderField("SMTP")}
                                                                    onChange={onSmtp}
                                                                    defaultValue={emailData.smtp}
                                                                    variant="outlined"
                                                                    style={{ width: 300 }}
                                                                />
                                                            </Grid>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "1rem" }}>
                                                <div >
                                                    {status ?
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            label={renderField("Description")}
                                                            multiline
                                                            value={emailData.desc}
                                                            rows={3}
                                                            variant="outlined"

                                                            style={{ flex: 1, width: 665, marginLeft: 25, marginRight: 24, }}

                                                        />

                                                        : <Grid item xs={12}>
                                                            <TextField
                                                                id="outlined-multiline-static"
                                                                label={renderField("Description")}
                                                                multiline
                                                                onChange={onDescription}
                                                                defaultValue={emailData.desc}
                                                                rows={3}
                                                                variant="outlined"
                                                                style={{ flex: 1, width: 665, marginLeft: 25, marginRight: 24, }}

                                                            />
                                                        </Grid>}
                                                </div>



                                            </div>

                                            <CardHeader
                                                action={
                                                    !status ? (
                                                        <Button
                                                            variant="contained"
                                                            // color="primary"
                                                            onClick={updateEmail}
                                                            style={{ background: "#3f51b5", color: "white", marginTop: 20 }}
                                                            disabled={accessActionBtn('Edit')}
                                                        >
                                                            {renderField("UPDATE")}

                                                        </Button>
                                                    ) : null
                                                }
                                            />
                                        </div>


                                    </ Paper >
                                </Grid>
                            </Grid>
                        </div> : null




                }





                <div>


                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="md"

                    >
                        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                        <DialogContent>
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    {renderField('Email Setting')}
                                </Typography>
                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="fname"
                                                name="Email"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label={renderField("Email ")}
                                                autoFocus
                                                onChange={onEmail}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label={renderField("Password")}
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                onChange={onPassword}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="smtp"
                                                label={renderField("SMTP")}
                                                name="SMTP"
                                                autoComplete="email"
                                                onChange={onSmtp}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="portNumber"
                                                label={renderField("Port Number")}
                                                name="PortNumber"
                                                autoComplete="email"
                                                onChange={onPortnumber}
                                            />
                                        </Grid>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label={renderField("Description")}
                                            multiline
                                            rows={6}
                                            variant="outlined"
                                            style={{ width: 1000, marginLeft: 8, marginRight: 8, marginTop: 10 }}
                                            onChange={onDescription}
                                        />

                                    </Grid>


                                </form>
                            </div>
                            <Box mt={5}>

                            </Box>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={settingEmail}

                                >
                                    {renderField('Save')}
                                </Button>
                                <Button
                                    style={{ background: "#f21505", color: "#f5fafa" }}
                                    variant="contained"
                                    onClick={handleClose}
                                >
                                    {renderField('Close')}
                                </Button>
                            </DialogActions>
                        </DialogContent>


                    </Dialog>
                </div>

            </Container>


        </AppConainer>

    )
}
