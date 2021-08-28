import React, { useState, useEffect } from 'react'
import { AppConainer } from '../../../components';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { RoleCard } from '../../../components/roleCard'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useUserData } from '../../../hooks/useUserData';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getScreenAccessByUserRoleIdThunk, fetchScreens } from 'generic'

const useStyles = makeStyles((theme) => ({

    // scroll: {
    //     overflowY: 'hidden',
    //     '&::-webkit-scrollbar': {
    //         width: '0.4em'
    //     },
    //     '&::-webkit-scrollbar-track': {
    //         boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    //         webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    //     },
    //     '&::-webkit-scrollbar-thumb': {
    //         backgroundColor: 'rgba(0,0,0,.1)',
    //         outline: '1px solid slategrey'
    //     }
    // },
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
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    newcss: {
        marginTop: -30
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },


    formControl: {
        // margin: theme.spacing(1),
        minWidth: '100%',
    },
    submit: {
        margin: theme.spacing(3, 1, 2),
    },


}))




export const AssignRole = () => {

    const dispatch = useDispatch();
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const user = useUserData()
    const [screenId, setScrennId] = useState('')
    const getuserRoll = useSelector((state) => state.userReducer.role)
    console.log("getuserRoll", getuserRoll)
    const screen = useSelector((state) => state.screenReducer)
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    console.log("getrollList", getuserRoll)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getScreens = async () => {
        const result = await dispatch(fetchScreens());
        console.log('resultScreen>>>', result)
        return result.payload;
    };

    useEffect(async () => {
        console.log(user)
        const id = user.id;
        const token = window.localStorage.getItem('token')
        console.log(token)
        const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }))
        console.log("result", result.payload)
        // getScreens();
        // const tempArr = [];
        // screen.map((item)=>{
        //         console.log(item)
        //     tempArr.push({name:item.screenName, id:item.id})


        //         setScrennId(item.id)


        //     })

    }, [])


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
            <AppConainer
                screename={"Role"}

            >
                <div style={{ padding: 20 }}>
                    <div style={{ position: 'relative', top: 10, left: 10, bottom: 20 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            // className={classes.button}
                            startIcon={<AddIcon />}
                            // style={{marginBottom:20}}
                            onClick={handleClickOpen}
                        >
                            {renderField('ADD ROLE')}

                        </Button>

                    </div>
                    {getuserRoll.length > 0 && getuserRoll.map((item, index) => {
                        return (
                            <RoleCard key={index} data={item} handleClose={handleClose} open={open} setOpen={setOpen} />
                        )
                    })}
                </div>





            </AppConainer>
        </>
    )
}
