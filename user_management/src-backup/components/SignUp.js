import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { doRegister } from 'generic/src/redux/reducers/authReducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { editUserThunk, getScreenAccessByUserRoleIdThunk } from 'generic';
import { useCustomNotify } from '../components'
import { useUserData } from '../hooks/useUserData';
import ReCAPTCHA from 'react-google-recaptcha';


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

export const SignUp = ({ handleClose, open, editData, setRefresh, onSubmitClick, onSubmitClose, onSuccess }) => {
    const CustomNotify = useCustomNotify();
    const classes = useStyles()
    const dispatch = useDispatch()
    const userData = useUserData();
    const [isSubmit, setIsSubmit] = useState(false)
    const roleData = useSelector((state) => state.userReducer.role)
    // console.log("roleDat",roleData)
    const [userid, setUserId] = useState(0)
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
    const [accessList, setAccessList] = useState([]);
    // const token = window.localStorage.getItem('token')
    const [status, setStatus] = useState(false)
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const recaptchaRef = React.createRef();

    // console.log("isSubmit",isSubmit)

    useEffect(() => {
        if (editData !== null) {
            setUserId(editData.id)
            setFirstName(editData.usr_FName)
            setLastName(editData.usr_LName)
            setUserName(editData.userName)
            setEmail(editData.email)
            setPassword()
            setMobile(editData.mobile)
            setRoleId(editData.roleId)
            setApp_id(editData.app_id)
            setFinance_year(editData.finance_year)
            setIp_Address(editData.ip_Address)
            setImage(editData.image)
            setCompanyId(editData.companyId)

        } else {
            setUserId(0)
            setFirstName('')
            setLastName("")
            setUserName("")
            setEmail("")
            setPassword("")
            setMobile("")
            setRoleId()
            setApp_id(0)
            setFinance_year(0)
            setIp_Address("")
            setImage("")
            // setCompanyId(0)
        }

    }, [editData])
    const onsubmit = async (e) => {
        e.preventDefault()

        // if (status) {

        handleClose(false)
        onSubmitClick(e);
        setIsSubmit(true)

        const data = {
            id: userid,
            firstName,
            lastName,
            userName,
            email,
            password,
            mobile,
            roleId,
            app_id,
            finance_year,
            ip_Address,
            image,
            companyId,
        }
        const token = window.localStorage.getItem('token')

        console.log("tokennnnnnnn", token)


        if (userid > 0) {
            const result = await dispatch(editUserThunk({ data, token }))

            console.log(token)
            if (result.payload === "User Updated") {
                // alert("user successfully Updated")
                onSuccess();
                CustomNotify(renderField("User Updated Successfully"), "success");
                handleClose(false)

            } else {
                CustomNotify(renderField("something went wrong"), "error");
                handleClose(false)
                onSubmitClose();
            }
        } else {
            const token = window.localStorage.getItem('token')


            const result = await dispatch(doRegister({ data, token }))

            console.log("result", result)
            if (result.payload === "User Created") {
                // alert("user successfully created")
                handleClose(false)
                onSuccess();
                CustomNotify(renderField("User Updated Successfully"), "success");
                setRefresh(result.payload)

            } else {
                // alert("something went wrong")
                CustomNotify(renderField("something went wrong"), "error");
                handleClose(false)
                onSubmitClose();
            }
        }

        // }

        setIsSubmit(false)

    }

    const renderField = (value) => {
        let screenName = value;
        if (langField) {
            let filterField = langField.filter(i => i.field === value);
            if (filterField.length > 0) {
                screenName = filterField[0].description;
            };
        };
        return screenName;
    };

    const uploadImage = (e) => {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result)
            let img = reader.result.split(',')
            setImage(img[1])
        }
    }

    const statushandler = (value) => {
        if (value) {
            setStatus(true)
        }

    }

    useEffect(() => {
        permiRolelist();
    }, [])


    const permiRolelist = async () => {
        const token = window.localStorage.getItem('token')
        const id = userData.RoleId;
        const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }));
        let getScreenId = result.payload.screens.filter((i) => i.screenName === "User");
        let filterAccessList = result.payload.permissions.filter((i) => i.screenId === getScreenId[0].screenId);
        setAccessList(filterAccessList)
    };

    const accessActionBtn = (btn) => {
        let accessBtn = accessList.find((i) => i.permin_title === btn);
        return accessBtn ? false : true;
    }




    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">{editData !== null ? renderField('Edit User') : renderField('Sign Up')}</DialogTitle>
                {/* {console.log("ddd", images)} */}

                {/* {images && <img src={images} style={{ width: 70, height: 70, position: 'relative', left: 250 }} alt="" />} */}
                <DialogContent>
                    <form noValidate autoComplete="on" onSubmit={onsubmit}  >

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.formControl}
                                    id="outlined-basic"
                                    label={renderField('firstname')}
                                    name="firstName"
                                    value={firstName}

                                    variant="outlined"
                                    onChange={(e) => setFirstName(e.target.value)} />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.formControl}
                                    id="outlined-basic"
                                    label={renderField('lastname')}
                                    name="lastName"
                                    value={lastName}
                                    variant="outlined"
                                    onChange={(e) => setLastName(e.target.value)} />

                            </Grid>

                            {
                                editData !== null ?
                                    <Grid item xs={6}>
                                        <TextField
                                            className={classes.formControl}
                                            id="outlined-basic"
                                            label={renderField('userName')}
                                            name="userName"
                                            value={userName}
                                            variant="outlined"
                                            onChange={(e) =>
                                                setUserName(e.target.value)} />

                                    </Grid>
                                    :
                                    <Grid item xs={6}>
                                        <TextField
                                            className={classes.formControl}
                                            id="outlined-basic"
                                            label={renderField('userName')}
                                            name="userName"
                                            variant="outlined"
                                            onChange={(e) =>
                                                setUserName(e.target.value)} />

                                    </Grid>


                            }

                            <Grid item xs={6}>
                                <TextField
                                    className={classes.formControl}
                                    id="outlined-basic"
                                    label={renderField('Email ')}
                                    name="email"
                                    value={email}
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)} />

                            </Grid>

                            {
                                editData !== null ?

                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.formControl}
                                            id="outlined-basic"
                                            label={renderField('mobile')}
                                            name="mobile"
                                            value={mobile}
                                            variant="outlined"
                                            onChange={(e) => setMobile(e.target.value)} />


                                    </Grid>
                                    :
                                    <>

                                        <Grid item xs={6}>
                                            <TextField
                                                className={classes.formControl}
                                                id="outlined-basic"
                                                label={renderField('Password')}
                                                name="password"
                                                variant="outlined"
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)} />

                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                className={classes.formControl}
                                                id="outlined-basic"
                                                label={renderField('mobile')}
                                                name="mobile"
                                                value={mobile}
                                                variant="outlined"
                                                onChange={(e) => setMobile(e.target.value)} />

                                        </Grid>
                                    </>

                            }

                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">{renderField('role')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name="roleId"
                                        value={roleId}
                                        onChange={(e) => setRoleId(e.target.value)} label="Role"

                                    >
                                        <MenuItem value="">
                                            <em>{renderField('Select')}</em>
                                        </MenuItem>



                                        {
                                            roleData?.length && roleData?.map(item => {
                                                return (
                                                    <MenuItem value={item.id}>{item.roleName}</MenuItem>


                                                )

                                            })
                                        }

                                    </Select>

                                </FormControl>
                            </Grid>

                            {/* {
                                editData !== null ? "" :

                                    <Grid item xs={6}> */}
                            {/* <TextField type="text"  className={classes.formControl} id="outlined-basic" label="app_id" name="app_id" variant="outlined" onChange={(e)=>setApp_id(e.target.value)}/> */}
                            {/* <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">App_id</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                label="app_id"
                                                name="app_id"
                                                value={app_id}
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


                            }
 */}
                            {/* <Grid item xs={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">finance_year</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="finance_year"
                                        name="finance_year"
                                        value={finance_year}
                                        onChange={(e) => setFinance_year(e.target.value)}
                                    >
                                        <MenuItem>
                                            <em>Select</em>
                                        </MenuItem>
                                        <MenuItem value={2010}>2010</MenuItem>
                                        <MenuItem value={2012}>2012</MenuItem>
                                        <MenuItem value={2023}>2023</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid> */}

                            {/* {
                                editData !== null ? '' :
                                    <Grid item xs={6}>

                                        <TextField
                                            className={classes.formControl}
                                            id="outlined-basic"
                                            label="Ip_Address"
                                            name="ip_Address"
                                            value={ip_Address}
                                            variant="outlined"
                                            onChange={(e) => setIp_Address(e.target.value)} />
                                    </Grid>



                            } */}





                        </Grid>
                        {/* <TextField className={classes.formControl} id="outlined-basic" label="companyId" name="companyId" variant="outlined" onChange={(e)=>setCompanyId(e.target.value)} /> */}

                        <TextField type="file" className={classes.formControl}
                            onChange={uploadImage}
                            id="outlined-basic"
                            name="image"
                            variant="outlined" label={image ? '' : null} />

                        {

                            editData !== null ? '' :
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">{renderField('companyId')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="companyId"
                                        name="companyId"
                                        value={companyId}

                                        onChange={(e) => setCompanyId(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>{renderField('Select')}</em>
                                        </MenuItem>
                                        <MenuItem value={1}>{renderField('Microsoft')}</MenuItem>
                                        <MenuItem value={1}>{renderField('Google')}</MenuItem>
                                        <MenuItem value={1}>{renderField('Amezon')}</MenuItem>

                                    </Select>
                                </FormControl>


                        }
                        <ReCAPTCHA
                            style={{ marginLeft: 10, marginTop: 10 }}
                            sitekey="6LcJp78bAAAAAEOtxDnl6BoADH6Nq12fe_vzLjof"
                            ref={recaptchaRef}
                            value={status}
                            onChange={statushandler}
                        />


                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmit}
                            className={classes.submit}
                            // disabled={accessActionBtn('Submit')}

                        >
                            {isSubmit ? <CircularProgress /> : renderField('SUBMIT')}
                        </Button>

                    </form>

                </DialogContent>


            </Dialog>

        </>
    )
}