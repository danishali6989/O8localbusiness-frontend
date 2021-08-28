import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useUserData } from '../hooks/useUserData';
// import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),

    },


    container: {
        width: '100%',
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    submit: {
        margin: theme.spacing(3, 1, 2),
        // width:'100%'
    },
}));



export const DailogeBox = ({
    paswordOpen,
    handlePasswordOpen,
    handlePasswordClose,
    pass,
    msgOpen,
    handlemsgBoxClose,
    handlemsgBoxOpen,
    content,
    passwrdData
}) => {
    const classes = useStyles()
    // const dispatch = useDispatch()

    const [adminPassword, setAdminPassword] = useState('');
    const [adminid, setAdminid] = useState('');
    const [newPassword, setNewPassword] = useState('')

    const admin = useUserData();


    return (

        <div>
            {
                pass &&
                <>
                    <Dialog open={paswordOpen} onClose={handlePasswordClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                        <DialogContent>
                            <form noValidate autoComplete="on" className={classes.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.formControl}
                                            id="outlined-basic"
                                            label="Admin password"

                                            variant="outlined"
                                            onChange={(e) => setAdminPassword(e.target.value)}
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.formControl}
                                            id="outlined-basic"
                                            label="New password"
                                            onChange={(e) => setAdminid(e.target.value)}
                                            variant="outlined"
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.formControl}
                                            id="outlined-basic"
                                            label="Change password"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            variant="outlined"
                                        />

                                    </Grid>


                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className={classes.submit}

                                onClick={(e) => {
                                    e.preventDefault()
                                    // SubmitData()
                                }}

                            >
                                {'submit'}
                            </Button>
                        </DialogActions>
                    </Dialog>


                </>
            }

        </div>
    )
}