import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { doRegister } from 'generic/src/redux/reducers/authReducer';


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
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
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

export const SignUp = ({ handleClose, open }) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const roleData = useSelector((state) => state.accountReducer.role)
    console.log("roleDat",roleData)
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
            firstName, lastName, userName, email,
            password, mobile, roleId, app_id, finance_year,
            ip_Address, image, companyId

        }

        const result = await dispatch(doRegister(data))

        console.log("result", result)



    }




    const uploadImage = async (e) => {

        var file = e.target.files[0];
        const base64 = await convertBase64(file)
        // let reader = new FileReader()
        // reader.readAsDataURL(file)
        // reader.onload = () => {
        //     console.log(reader.result)
        //     setImage(reader.result)
        // }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload(() => {
                resolve(fileReader.result)
            })
            fileReader.onload((err) => {
                reject(err)
            })

        })
    }


    return (
        <>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ padding: 20 }}>
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                {/* {console.log("ddd", images)} */}

                {/* {images && <img src={images} style={{ width: 70, height: 70, position: 'relative', left: 250 }} alt="" />} */}
                <DialogContent>
                    <form noValidate autoComplete="on" onSubmit={onsubmit} style={{ marginRight: 20 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField className={classes.formControl} id="outlined-basic" label="firstname" name="firstName" variant="outlined" onChange={(e) => setFirstName(e.target.value)} />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.formControl} id="outlined-basic" label="lastname" name="lastName" variant="outlined" onChange={(e) => setLastName(e.target.value)} />

                            </Grid>

                            <Grid item xs={6}>
                                <TextField className={classes.formControl} id="outlined-basic" label="userName" name="userName" variant="outlined" onChange={(e) => setUserName(e.target.value)} />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.formControl} id="outlined-basic" label="Email" name="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />

                            </Grid>

                            <Grid item xs={6}>
                                <TextField className={classes.formControl} id="outlined-basic" label="Password" name="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.formControl} id="outlined-basic" label="Mobile" name="mobile" variant="outlined" onChange={(e) => setMobile(e.target.value)} />

                            </Grid>

                            <Grid item xs={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name="roleId"
                                        onChange={(e) => setRoleId(e.target.value)} label="Role"

                                    >
                                        <MenuItem value="">
                                            <em>Select</em>
                                        </MenuItem>



                                        {
                                            roleData&&
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
                                {/* <TextField type="text"  className={classes.formControl} id="outlined-basic" label="app_id" name="app_id" variant="outlined" onChange={(e)=>setApp_id(e.target.value)}/> */}
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">App_id</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="app_id"
                                        name="app_id"
                                        onChange={(e) => setApp_id(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={34}>34</MenuItem>
                                        <MenuItem value={45}>45</MenuItem>
                                    </Select>
                                </FormControl>

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
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">ip_Address</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="ip_Address"
                                        name="ip_Address"

                                        onChange={(e) => setIp_Address(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        <MenuItem value={'23.23'}>23.23</MenuItem>
                                        <MenuItem value={'24.43'}>24.43</MenuItem>
                                        <MenuItem value={'45.54'}>45.54</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>




                        </Grid>
                        {/* <TextField className={classes.formControl} id="outlined-basic" label="companyId" name="companyId" variant="outlined" onChange={(e)=>setCompanyId(e.target.value)} /> */}

                        <TextField type="file" className={classes.formControl}
                            onChange={uploadImage}
                            id="outlined-basic" variant="outlined" label={image ? 'File' : null} />

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">companyId</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                label="companyId"
                                name="companyId"

                                onChange={(e) => setCompanyId(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                            </Select>
                        </FormControl>


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

                </DialogContent>


            </Dialog>

        </>
    )
}