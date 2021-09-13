import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { doRegister } from 'generic/src/redux/reducers/authReducer';
import { useHistory, useParams } from 'react-router';
import { editUserThunk } from 'generic/src/redux/reducers/userReducer';


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
        marginTop: theme.spacing(3),
    },


    container: {
        width: '100%',
       
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    submit: {
        margin: theme.spacing(3, 1, 2),
    },
}));

export const EditUser = ({ handleClose, open }) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()

    const roleData = useSelector((state) => state.accountReducer.role)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [roleId, setRoleId] = useState('')
    const [app_id, setApp_id] = useState('')
    const [finance_year, setFinance_year] = useState('')
    const [ip_Address, setIp_Address] = useState('')
    const [image, setImage] = useState('')
    const [companyId, setCompanyId] = useState('')

    const onsubmit = async (e) => {
        e.preventDefault()
        const data = {
            "id": 0, firstName, lastName, userName,
            email, password, mobile, roleId, app_id, finance_year,
            ip_Address, image, companyId

        }
        const result = await dispatch(editUserThunk(data))
        history.push('/UserManagement')

    }

    const userData = useSelector((state) => state.userReducer.data);


    useEffect(() => {
        getData()

    }, [])

    const getData = () => {
        const newData = userData.filter((item) => item.id == params.id)
        setFirstName(newData[0].usr_FName)
        setLastName(newData[0].usr_LName)
        setUserName(newData[0].userName)
        setEmail(newData[0].email)
        // setPassword(newData[0].pa)
        setMobile(newData[0].mobile)
        setRoleId(newData[0].roleId)
        setApp_id(newData[0].app_id)
        setFinance_year(newData[0].finance_year)
        setIp_Address(newData[0].ip_Address)
        setCompanyId(newData[0].companyId)
    }

    const onHandleImageChange = (e) => {

        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImage(reader.result)
        }
    }


    return (
        <>
            <Grid xs={7}>
                <form noValidate autoComplete="on" onSubmit={onsubmit} style={{ marginRight: 20 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField className={classes.formControl} id="outlined-basic" label={"firstname"} value={firstName} name="firstName" variant="outlined" onChange={(e) => setFirstName(e.target.value)} />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.formControl} id="outlined-basic" label="lastname" value={lastName} name="lastName" variant="outlined" onChange={(e) => setLastName(e.target.value)} />

                        </Grid>

                        <Grid item xs={6}>
                            <TextField className={classes.formControl} id="outlined-basic" label={"userName"} value={userName} name="userName" variant="outlined" onChange={(e) => setUserName(e.target.value)} />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.formControl} id="outlined-basic" label={"Email"} value={email} name="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />

                        </Grid>

                        <Grid item xs={6}>
                            <TextField className={classes.formControl} id="outlined-basic" label="Password" name="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />

                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classes.formControl} id="outlined-basic" label="Mobile" value={mobile} name="mobile" variant="outlined" onChange={(e) => setMobile(e.target.value)} />

                        </Grid>

                        <Grid item xs={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={roleId}
                                    onChange={(e) => setRoleId(e.target.value)} label="Role"

                                >
                                    <MenuItem >
                                        <em>Select</em>
                                    </MenuItem>



                                    {
                                        roleData.map(item => {
                                            return (
                                                <MenuItem value={item.keyInt}>{item.value}</MenuItem>


                                            )

                                        })
                                    }

                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="text" className={classes.formControl} id="outlined-basic" value={app_id} label="app_id" name="app_id" variant="outlined" onChange={(e) => setApp_id(e.target.value)} />

                        </Grid>

                        <Grid item xs={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">finance_year</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="finance_year"
                                    name="finance_year"
                                    onChange={(e) => setFinance_year(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Select</em>
                                    </MenuItem>
                                    <MenuItem value={2010}>2010</MenuItem>
                                    <MenuItem value={2012}>2012</MenuItem>
                                    <MenuItem value={2023}>2023</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField className={classes.formControl} id="outlined-basic" label="ip_Address" value={ip_Address} name="ip_Address" variant="outlined" onChange={(e) => setIp_Address(e.target.value)} />

                        </Grid>







                    </Grid>

                    <TextField type="file" className={classes.formControl}
                        onChange={onHandleImageChange}
                        id="outlined-basic" variant="outlined" label={image ? 'File' : null} />

                    <TextField className={classes.formControl} id="outlined-basic" label="companyId" value={companyId} name="companyId" variant="outlined" onChange={(e) => setCompanyId(e.target.value)} />

                   

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submit}
                    >
                        submit
                    </Button>

                </form>

            </Grid>



        </>

    )
}