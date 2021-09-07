
import { Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { AppConainer } from '../../../components'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ScreenComponents } from './screenComponents';
import { AddPermissionAddThunk } from 'generic'
import { FormControl, InputLabel, MenuItem, Select, Grid, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    GetAllPermissionThunk
} from 'generic'

const useStyles = makeStyles((theme) => ({
    root: {

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export const AssignPermission = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [permissions, setPermissions] = useState(null);
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const [roleId, setRoleId] = useState();
    const roleData = useSelector((state) => state.userReducer.role);
    const screenlist = useSelector((state) => state.screenReducer.screens);
    const [selectedPermission, setSelectedPermission] = useState([]);
    const [unSelectedPermission, setUnSelectedPermission] = useState([]);


    console.log('screenss--', screenlist)
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

    // const itemRoleid = (event) => {
    //     setItemroleid(event.target.value)
    // }

    const submitData = async () => {
        const token = window.localStorage.getItem('token')

        const data = {
            // permission_id: 0,
            // role_id: itemroleid
        }
        console.log("data", data)
        // const result = await dispatch(AddPermissionAddThunk({ data, token }))
        // console.log({ result })
    }

    useEffect(async () => {
        const result = await dispatch(GetAllPermissionThunk())
        setPermissions(result.payload);
    }, [])



    // const selectedPermi = (item) => {
    //     // console.log('itemitem',item)
    // }

    // const selectedArray = (item) => {
    //     const data = selectedPermission;
    //     data.concat(item)
    //     setSelectedPermission(oldArray => [...oldArray, 
    //     item,
    //   ])
    //     console.log('itemitem', data)
    //     // data(items)
    //     // setSelectedPermission
    // }

    // const unSelectedArray = () => {

    // }

    return (
        <AppConainer>
            <Container>
                <div className={classes.root} style={{ marginLeft: 150, marginTop: 50 }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">{renderField('role')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="roleId"
                                    value={roleId}
                                    // onChange={itemRoleid}
                                    onChange={(e) => setRoleId(e.target.value)}
                                    label="Role"
                                    style={{ width: 300, marginBottom: 20 }}
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
                        <Grid item xs={12}>
                            {
                                screenlist.map((item) => {
                                    return (
                                        <ScreenComponents
                                            key={item.id}
                                            title={item.screenName}
                                            id={item.id}
                                            permissions={permissions?.filter(i => i.screenId === item.id)}
                                            // selectedPermi={selectedPermi} 
                                            rollId={roleId}
                                        // selectedArray={selectedArray} 
                                        // unSelectedArray={unSelectedArray} 
                                        />
                                    )
                                })
                            }
                        </Grid>

                    </Grid>

                </div>
            </Container>
        </AppConainer>

    )
}
