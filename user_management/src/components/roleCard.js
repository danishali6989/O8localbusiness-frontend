import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Edit from '@material-ui/icons/Edit';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useUserData } from '../hooks/useUserData';
// import { editRoleThunk } from '../../../../generic';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { updateRoleThunck } from 'generic'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { addRoleThunck } from 'generic';
import { useHistory } from 'react-router';
import { addScreenAccessThunk } from 'generic'
import Multiselect from 'multiselect-react-dropdown';
import { useCustomNotify } from '../components'
import { CircularProgress } from '@material-ui/core';

import { getRoleThunk } from 'generic/src/redux/reducers/userReducer';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        display: 'inline-block',
        marginTop: 20,
        padding: 5,
        spacing: 1,
        marginBottom: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    chip: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        // backgroundColor:''
        '& > *': {

        },
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    newcss: {
        marginTop: -30
    },

}));

export const RoleCard = ({ data, handleClose, open, setOpen }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useUserData()
    const history = useHistory()
    const CustomNotify = useCustomNotify();

    const screen = useSelector((state) => state.screenReducer.screens)


    const [checkUpdate, setCheckUpdate] = useState('')
    const [roleName, setRoleName] = useState('')
    const [hide, setHide] = useState(false)

    // console.log("authData", authData)
    const [status, setStatus] = useState(true);
    const [text, setText] = useState(data.roleName);
    const [roleid, setRoleId] = useState(data.id)
    const [secreenOpen, setSecreenOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [multipleScreen, setMultipleScreen] = useState([])
    const [screenData, setScreenData] = useState('')
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);

    console.log("langField>>", langField)

    console.log("text>>", text)




    useEffect(() => {
        // editHandler()

        const tempArr = [];
        screen.map((item) => {
            console.log("temoaray item data", item)
            tempArr.push({ name: item.screenName, id: item.id })
        })
        setMultipleScreen(tempArr)
        console.log(tempArr)


    }, [])

    const getlAllUserRole = async () => {
        const result = await dispatch(getRoleThunk());
    };





    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const token = window.localStorage.getItem('token')
        console.log(token)

        data = {
            roleName,
        }
        const result = await dispatch(addRoleThunck({ data, token }))
        console.log(result)
        if (result.payload === "Created") {
            CustomNotify('role Created successfully', 'success');
            //  alert("role Created successfully")
            getlAllUserRole();
            handleClose()
        } else {
            CustomNotify('something went  wrong', 'error');
            // alert("something went  wrong")
        }
        console.log(result)


    }

    const updateHandler = async (text) => {
        console.log("etxt", text)
        // const id = user.id;
        setLoading(true)

        const data = {
            roleName: text,
            id: parseInt(roleid)

        }

        console.log("data", data)
        const token = window.localStorage.getItem('token')

        const result = await dispatch(updateRoleThunck({ data, token }))
        console.log("result", result)

        if (result.payload === "Updeted") {
            CustomNotify("Role Updated Successfully", 'success')
            // setText(roleName)

            getlAllUserRole();


        } else {
            CustomNotify('Something went wrong!', 'error');
        }


        setLoading(false)
        setStatus(true)

    }
    const onChange = (e) => {
        console.log('e>>>>>>>>>>>', e.target.value)
        setText(e.target.value)
    }


    const handleScreenClose = () => {
        setSecreenOpen(false)
    }

    const handleScreenOpen = () => {
        setSecreenOpen(true)
    }
    const onSelect = (selectedList, selectedItem) => {
        console.log("list", selectedList)
        console.log("list", selectedItem)
        setScreenData(selectedList)
    }

    console.log('select item', screenData)
    const addAceessScrenn = async (userRoleid) => {
        setLoading(true);
        console.log('aaaaa', screenData)
        console.log("dddd", userRoleid)
        const sdata = [];
        screenData && screenData.map((s) => {
            console.log("sss", s)
            sdata.push(s.id);
        })
        console.log('final screen', sdata)



        console.log('sdata', screenData)
        const data = {
            userRoleId: parseInt(roleid),
            screenId: sdata.join(),
            canAccess: true
        }
        console.log("data", data)
        const token = window.localStorage.getItem('token')

        const result = await dispatch(addScreenAccessThunk({ data, token }))
        console.log("result", result)
        setSecreenOpen(false)
        setLoading(false);
        if (result.payload === 'Created') {
            CustomNotify('User succesfully created access screen', 'success');
        } else {
            CustomNotify('Something went wrong!', 'error');
        }


    }

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

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


    return (
        <>

            <Grid className={classes.root}>
                <Box boxShadow={3} >
                    <Card variant="outlined" style={{ padding: 10 }}>
                        <CardHeader

                            avatar={
                                <Button
                                    variant="contained"
                                    color="primary"

                                    // className={classes.button}
                                    // startIcon={<AddIcon />}
                                    style={{ fontSize: 12, textTransform: 'capitalize' }}
                                    onClick={handleScreenOpen}
                                >
                                    {renderField('Add Screens')}
                                    <AddCircleIcon style={{ marginLeft: 5 }} />
                                </Button>

                            }
                            action={status ?
                                <>

                                    <Button variant="contained"
                                        style={{ marginTop: 9, marginRight: 24, textTransform: 'capitalize', fontSize: 13 }}
                                        color="primary"
                                        // edge="start"
                                        // aria-label="open drawer"
                                        onClick={() => {
                                            setStatus(false)
                                        }}

                                    >
                                        {renderField('Edit Roles')}
                                        <Edit style={{ marginLeft: 5, fontSize: 18 }} />
                                    </Button>
                                </>
                                :
                                <IconButton
                                    edge="start"
                                    aria-label="open drawer"
                                    variant="contained" color="primary"
                                    onClick={() => { setStatus(true) }}
                                >
                                    <CancelIcon />
                                </IconButton>
                            }

                        />

                        <CardContent className={classes.newcss}  >
                            {status ?
                                <Typography variant="h6" component="h5">
                                    {data.roleName}
                                </Typography> : <TextField id="outlined-basic"
                                    value={text}
                                    onChange={onChange}
                                    variant="outlined" />
                            }

                            {
                                status &&
                                <Typography className={classes.pos} color="textSecondary">
                                    #{roleid}
                                </Typography>
                            }

                            {/* <Chip label=" primary" style={{width:160}} className={classes.chip} onDelete={handleDelete}  color="primary" /> */}

                        </CardContent>

                        {
                            status || hide ? '' : ' ' &&
                                <Button variant="contained" style={{ marginRight: 80, marginLeft: 80, marginBottom: 10 }}
                                    onClick={() => updateHandler(text)} color="primary"
                                    disabled={loading} >
                                    {loading ? <CircularProgress size={18} /> :   renderField("UPDATE") }

                                </Button>
                        }
                        {/* <Chip
                            label="Clickable deletable"
                            className={classes.chip}

                            style={{ width: 160 }}
                            // onClick={handleClick}
                            onDelete={handleDelete}
                        /> */}

                    </Card>
                </Box>
            </ Grid >

            {/* <!----------------------------Add Role -----------------------------------------------------------------> */}

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <div style={{ margin: 20 }}>
                    <DialogTitle id="form-dialog-title">
                        {renderField('ADD ROLE')}
                    </DialogTitle>
                    <DialogContent >
                        <form noValidate autoComplete="on" onSubmit={onSubmitHandler}  >
                            <TextField className={classes.formControl} id="outlined-basic"     label= {renderField("role")} style={{ width: '100%', marginBottom: 20 }}
                                name="roleName" variant="outlined" onChange={(e) => setRoleName(e.target.value)} />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className={classes.submit}
                            >
                                {renderField('SUBMIT')}

                            </Button>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>

            <Dialog open={secreenOpen} onClose={handleScreenClose} aria-labelledby="form-dialog-title"  >
                <div style={{ margin: 20 }}>
                    <DialogTitle id="form-dialog-title">   {renderField('ADD SCREEN')}</DialogTitle>
                    <DialogContent style={{ width: 500, height: 280 }}>
                        <form noValidate autoComplete="on" className={classes.form}  >

                            <Multiselect
                                options={multipleScreen}

                                onSelect={onSelect}

                                displayValue="name"
                                style={{

                                    searchBox: {
                                        fontSize: 10,
                                        height: 50
                                    },
                                    inputField: {
                                        margin: 5
                                    },
                                    chips: {
                                        background: '#3f51b5'
                                    },
                                    optionContainer: {
                                        border: '2 solid red',
                                        height: 'auto'

                                    },
                                    option: {
                                        color: '#ffffff',
                                        background: '#3f51b5',
                                        height: 'auto'

                                    },


                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: 20 }}
                                fullWidth
                                disabled={loading}
                                className={classes.submit}
                                onClick={(event) => {
                                    event.preventDefault();
                                    addAceessScrenn(data)
                                }}

                            >
                                {loading ? <CircularProgress size={18} /> :  renderField('SUBMIT') }

                            </Button>



                        </form>

                    </DialogContent>
                </div>

            </Dialog>





        </>
    )
}






