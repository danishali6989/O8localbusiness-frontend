
import { Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { AppConainer } from '../../../components'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select, Grid, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { AddPermissionAddThunk } from 'generic'
import { useCustomNotify } from '../../../components'
import { useUserData } from '../../../hooks/useUserData';
import { getScreenAccessByUserRoleIdThunk } from 'generic';
import { FieldDetailsbylanguage } from 'generic/src/api/routes';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);



export const ScreenComponents = ({ permissions, rolepermissions, title, selectedPermi, id, rollId, selectedArray, unSelectedArray }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userdata = useUserData();
  const langField = useSelector((state) => state.languageReducer.fieldlanguage);
  const permiroleid = useSelector((state) => state.screenReducer.screensbyRole.permissions);
  const roleData = useSelector((state) => state.userReducer.role);
  const [selectedPermission, setSelectedPermission] = useState([]);
  const [unSelectedPermission, setUnSelectedPermission] = useState([]);
  const CustomNotify = useCustomNotify();


  const handleRole = async (e) => {
    setSelectedPermission([]);
    const token = window.localStorage.getItem('token')
    const id = rollId
    const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }))
    result?.payload?.permissions?.map(i => {
      setSelectedPermission(oldArray => [...oldArray,
      i.per_id,
      ])
    })
  }

  const checkHandle = (itemId) => {
    if (!selectedPermission.includes(itemId)) {
      setSelectedPermission(oldArray => [...oldArray,
        itemId,
      ])
      setUnSelectedPermission([...unSelectedPermission?.filter(element => element !== itemId)])
    } else {
      setUnSelectedPermission(oldArray => [...oldArray,
        itemId,
      ])
      setSelectedPermission([...selectedPermission?.filter(element => element !== itemId)])
    }


  }

  useEffect(() => {
    handleRole();

  }, [rollId])

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



  const submitData = async () => {

    if (rollId) {
      const token = window.localStorage.getItem('token')
      const data = selectedPermission.map((Selected) => {
        return {
          role_id: rollId,
          permission_id: Selected,
          canCheck: true
        }
      }).concat(
        unSelectedPermission.map((Selected) => {
          return {
            role_id: rollId,
            permission_id: Selected,
            canCheck: false
          }
        }
        ))

      const result = await dispatch(AddPermissionAddThunk({ data, token }))
      if (result.payload === "RolePermission Added") {
        CustomNotify(renderField('Role Permission Added Successfully'), "success")
      } else {
        CustomNotify(renderField('Something went wrong'), "error")
      }
    } else {
      CustomNotify(renderField('Please select roll'), "warning")
    }
  }
  const isChecked = (permi) => {
    console.log("permi", permi)

  }
  return (
    <Accordion style={{ width: 800 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {
          !permissions?.length > 0 ?
            <p>Not having any permissions</p>
            : (
              <Grid container>
                <Grid item xs={12}>
                  {
                    permissions?.map((per) => {
                      isChecked(per)
                      return (
                        <FormControl key={title + '-' + per.id} style={{}}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                // checked={selectedPermission?.find(element => element.id === per.id)?.checked}
                                checked={selectedPermission?.includes(per.id)}
                                // checked={()=>}
                                onChange={() => { checkHandle(per.id) }}
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label={per.permissions}
                          />
                        </FormControl>
                      )
                    })
                  }
                </Grid>
                <Grid item xs={12} style={{ width: '100%' }}>
                  <Button variant="contained" color="primary" onClick={submitData} style={{ marginTop: 20 }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            )}
      </AccordionDetails>
    </Accordion>
  )
}