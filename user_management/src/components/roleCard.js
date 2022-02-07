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
import Chip from '@material-ui/core/Chip';
import { addRoleThunck, fetchScreens } from 'generic';
import { useHistory } from 'react-router-dom';
import { addScreenAccessThunk, getScreenAccessByUserRoleIdThunk, getRoleThunk } from 'generic'
import Multiselect from 'multiselect-react-dropdown';
import { useCustomNotify } from '../components'
import { CircularProgress } from '@material-ui/core';
import '../scrollbar.css'

// import { getRoleThunk } from 'generic/src/redux/reducers/userReducer';

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
    const userData = useUserData()
    // console.log("user", user.id)
    const history = useHistory()
    const CustomNotify = useCustomNotify();
    const screen = useSelector((state) => state.screenReducer.screens)
    const [checkUpdate, setCheckUpdate] = useState('')
    const [roleName, setRoleName] = useState('')
    const [hide, setHide] = useState(false)
    const [status, setStatus] = useState(true);
    const [text, setText] = useState(data.roleName);
    const [roleid, setRoleId] = useState(data.id)
    const [secreenOpen, setSecreenOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [multipleScreen, setMultipleScreen] = useState([])
    const [screenData, setScreenData] = useState('')
    const [accessList, setAccessList] = useState([]);
    const [display, setDisplay] = useState(false)
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
   
  


    console.log("next", screen)

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

    useEffect(() => {
        // editHandler()
        setScreenfatch();
        // const tempArr = [];
        // setScreenfatch()?.map((item) => {
        //     console.log("temoaray item data", item)
        //     tempArr.push({ name: item.screenName, id: item.id })
        // })
        // setMultipleScreen(tempArr)
        // console.log(tempArr)


    }, [renderField('UPDATE')])

    useEffect(() => {
        const tempArr = [];
        data?.screens?.map((item) => {
            tempArr.push({ name: renderField(item.screenName), id: item.screenId })
        });
        // setScreenRole(tempArr)
        setScreenData(tempArr);
    }, [data?.screens, renderField('UPDATE')])

    const getlAllUserRole = async () => {
        const result = await dispatch(getRoleThunk());
    };

    const setScreenfatch = async () => {

        const result = await dispatch(fetchScreens())
        const tempArr = [];
        result?.payload?.map((item) => {
            tempArr.push({ name: renderField(item.screenName), id: item.id })
        })
        setMultipleScreen(tempArr)
        // return result.payload
    }


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
            CustomNotify(renderField('role Created successfully'), 'success');
            getlAllUserRole();
            handleClose()
        } else {
            CustomNotify(renderField("something went wrong"), 'error');
        }
        console.log(result)

    }

    const updateHandler = async (text) => {
        setLoading(true)
        const data = {
            roleName: text,
            id: parseInt(roleid)
        }
        const token = window.localStorage.getItem('token')
        const result = await dispatch(updateRoleThunck({ data, token }))
        if (result.payload === "Updeted") {
            CustomNotify(renderField('Role Updated Successfully'), 'success')
            // setText(roleName)
            getlAllUserRole();
        } else {
            CustomNotify(renderField("something went wrong"), 'error');
        }
        setLoading(false)
        setStatus(true)
    }
    const onChange = (e) => {
        setText(e.target.value)
    }


    const handleScreenClose = () => {
        setSecreenOpen(false)
    }

    const handleScreenOpen = () => {
        setSecreenOpen(true)
    }
    const onRemove = (selectedList ) => {
        setScreenData(selectedList)
    }

    const onSelect = (selectedList) => {
        setScreenData(selectedList)
    }

    const addAceessScrenn = async (userRoleid) => {
        setLoading(true);
        const sdata = [];
        screenData && screenData.map((s) => {
            sdata.push(s.id);
        })


        const data = {
            userRoleId: parseInt(roleid),
            screenId: sdata.join(),
            canAccess: true
        }
        const token = window.localStorage.getItem('token')
        const result = await dispatch(addScreenAccessThunk({ data, token }))
        setSecreenOpen(false)
        setLoading(false);
        if (result.payload === 'Created') {
            getlAllUserRole();
            CustomNotify(renderField("User succesfully created access screen"), 'success');
        } else {
            CustomNotify(renderField("something went wrong"), 'error');
        }


    }

    useEffect(() => {
        permiRolelist();
        getlAllUserRole();
    }, [])

    const permiRolelist = async () => {
        const token = window.localStorage.getItem('token')
        const id = userData.RoleId;
        const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }));
        let getScreenId = result.payload.screens.filter((i) => i.screenName === "Roles");
        let filterAccessList = result.payload.permissions.filter((i) => i.screenId === getScreenId[0].screenId);
        setAccessList(filterAccessList)
    };

    const accessActionBtn = (btn) => {
        let accessBtn = accessList.find((i) => i.permin_title === btn);
        return accessBtn ? false : true;
    }


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
                                    disabled={accessActionBtn('Add')}


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
                                        disabled={accessActionBtn('Edit')}
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

                        </CardContent>

                        {
                            status || hide ? '' : ' ' &&
                                <Button variant="contained" style={{ marginRight: 80, marginLeft: 80, marginBottom: 10 }}
                                    onClick={() => updateHandler(text)} color="primary"
                                    disabled={loading} >
                                    {loading ? <CircularProgress size={18} /> : renderField("UPDATE")}

                                </Button>
                        }
                        {/* <Chip
                            label="Clickable deletable"
                            className={classes.chip}

                            style={{ width: 160 }}
                            // onClick={handleClick}
                            onDelete={handleDelete}
                        /> */}
                        <div style={{ width: 300, overflow: 'hidden' }}>
                            <div id="screenHorizontalView" style={{ width: '100%', height: '100%', display: 'flex', overflowY: 'hidden', paddingBottom: 5 }}>
                                {
                                    data?.screens?.map((item) => {
                                        return <Chip key={item.id} label={renderField(item.screenName)} deletable clickable onClick={() => history.push(item.screenUrl)} color="primary" style={{ marginRight: 10 }} />

                                        // return  <Chip size="small" label="Deletable Primary"  color="primary" />
                                    })
                                }
                            </div>
                        </div>

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
                            <TextField className={classes.formControl} id="outlined-basic" label={renderField("role")} style={{ width: '100%', marginBottom: 20 }}
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
                                // selectedValues={screenRole}
                                selectedValues={screenData}
                                onRemove={onRemove}
                                onSelect={onSelect}
                                displayValue="name"
                                style={{
                                    searchBox: {
                                        fontSize: 10,
                                        padding: 10
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
                                {loading ? <CircularProgress size={18} /> : renderField('SUBMIT')}

                            </Button>
                        </form>
                    </DialogContent>
                </div>

            </Dialog>

        </>
    )
}






