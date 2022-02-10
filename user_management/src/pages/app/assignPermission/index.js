
import { Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { AppConainer } from '../../../components'
import { makeStyles } from '@material-ui/core/styles';
import { ScreenComponents } from './screenComponents';
import { useUserData } from '../../../hooks/useUserData';
import { FormControl, InputLabel, MenuItem, Select, Grid, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    GetAllPermissionThunk, getScreenAccessByUserRoleIdThunk,fetchScreens
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
    const userdata = useUserData();
    const [permissions, setPermissions] = useState(null);
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const [roleId, setRoleId] = useState();
    const roleData = useSelector((state) => state.userReducer.role);
    const screenlist = useSelector((state) => state.screenReducer.screens);
    const [selectedPermission, setSelectedPermission] = useState([]);
    const [rolepermissions, setRolePermissions] = useState([]);
 
    
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
        getScreens()

    }, [])

    const getScreens = async () => {
        const result = await dispatch(fetchScreens());
        return result;

    };
    useEffect(async () => {
        const result = await dispatch(GetAllPermissionThunk())
        setPermissions(result.payload);
    }, [])

    const handleRole = async (e) => {
        setRoleId(e.target.value)
        console.log(1)
        const token = window.localStorage.getItem('token')
        const id = roleId;
        const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }))
        setRolePermissions(result.payload.permissions)

    }


    return (
        <AppConainer>
            <Container>
                <div className={classes.root} style={{ marginLeft: 150, marginTop: 50 }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">{renderField('Add Roles')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="roleId"
                                    value={roleId}
                                    // onChange={itemRoleid}
                                    // onChange={(e) => handleRole(e)}
                                    onChange={(e) => setRoleId(e.target.value)}
                                    label="Add Roles"
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
                                            rollId={roleId}
                                            rolepermissions={rolepermissions}

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
