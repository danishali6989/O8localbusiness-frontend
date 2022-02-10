import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useUserData } from "../hooks/useUserData";
import { getScreenAccessByUserRoleIdThunk } from "generic";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    // width: '100%',
    width: 500,
    // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },

  container: {
    width: "100%",
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: "100%",
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
  passwrdData,
}) => {
  const classes = useStyles();
  const [adminPassword, setAdminPassword] = useState("");
  const [adminid, setAdminid] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const [accessList, setAccessList] = useState([]);
  const langField = useSelector((state) => state.languageReducer.fieldlanguage);
  const userData = useUserData();

  const renderField = (value) => {
    let screenName = value;
    if (langField) {
      let filterField = langField.filter((i) => i.field === value);
      if (filterField.length > 0) {
        screenName = filterField[0].description;
      }
    }
    return screenName;
  };

  useEffect(() => {
    permiRolelist();
  }, []);

  const permiRolelist = async () => {
    const token = window.localStorage.getItem("token");
    const id = userData.RoleId;
    const result = await dispatch(
      getScreenAccessByUserRoleIdThunk({ id, token })
    );
    let getScreenId = result.payload.screens.filter(
      (i) => i.screenName === "Users"
    );
    let filterAccessList = result.payload.permissions.filter(
      (i) => i.screenId === getScreenId[0].screenId
    );
    setAccessList(filterAccessList);
  };

  const accessActionBtn = (btn) => {
    let accessBtn = accessList.find((i) => i.permin_title === btn);
    return accessBtn ? false : true;
  };

  return (
    <div>
      {pass && (
        <>
          <Dialog
            open={paswordOpen}
            onClose={handlePasswordClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {renderField("Change Password")}
            </DialogTitle>
            <DialogContent>
              <form
                noValidate
                autoComplete="on"
                style={{ padding: 20 }}
                className={classes.form}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.formControl}
                      id="outlined-basic"
                      label={renderField("Admin password")}
                      variant="outlined"
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.formControl}
                      id="outlined-basic"
                      label={renderField("New password")}
                      onChange={(e) => setAdminid(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.formControl}
                      id="outlined-basic"
                      label={renderField("Change Password")}
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
                // disabled={accessActionBtn('Change Password')}
                onClick={(e) => {
                  e.preventDefault();
                  // SubmitData()
                }}
              >
                {renderField("SUBMIT")}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};
