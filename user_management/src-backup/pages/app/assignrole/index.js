import React, { useState, useEffect } from "react";
import { AppConainer } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { RoleCard } from "../../../components/roleCard";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useUserData } from "../../../hooks/useUserData";
import { makeStyles } from "@material-ui/core/styles";
import {
  getScreenAccessByUserRoleIdThunk,
  fetchScreens,
  getlAllUserRole,
} from "generic";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    display: "inline-block",
    marginTop: 20,
    padding: 5,
    spacing: 1,
    marginBottom: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  newcss: {
    marginTop: -30,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
}));

export const AssignRole = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const user = useUserData();
  const [screenId, setScrennId] = useState("");
  const getuserRoll = useSelector((state) => state.userReducer.role);

  const screen = useSelector((state) => state.screenReducer);
  const langField = useSelector((state) => state.languageReducer.fieldlanguage);
  const [accessList, setAccessList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getScreens = async () => {
    const result = await dispatch(fetchScreens());
    return result.payload;
  };

  const fitlerScreenData = async () => {
    // find role id
    // find permission list using roled id  => 3
  };

  useEffect(async () => {
    getAllusersName();
    const id = user.id;
    const token = window.localStorage.getItem("token");
    const result = await dispatch(
      getScreenAccessByUserRoleIdThunk({ id, token })
    );
  }, []);

  const getAllusersName = async () => {
      alert(123)
    const result = await dispatch(getlAllUserRole());
    console.log("getAllusersName", result);
  };

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
    getAllusersName();
  }, []);

  const permiRolelist = async () => {
    const token = window.localStorage.getItem("token");
    const id = user.RoleId;
    const result = await dispatch(
      getScreenAccessByUserRoleIdThunk({ id, token })
    );
    let getScreenId = result.payload.screens.filter(
      (i) => i.screenName === "Roles"
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
    <>
      <AppConainer screename={"Role"}>
        <div style={{ padding: 20 }}>
          <div style={{ position: "relative", top: 10, left: 10, bottom: 20 }}>
            <Button
              variant="contained"
              color="primary"
              // className={classes.button}
              startIcon={<AddIcon />}
              // style={{marginBottom:20}}
              onClick={handleClickOpen}
              // disabled={accessActionBtn('Add')}
            >
              {renderField("ADD ROLE")}
            </Button>
          </div>
          {getuserRoll?.length > 0 &&
            getuserRoll.map((item, index) => {
              return (
                <RoleCard
                  key={index}
                  data={item}
                  handleClose={handleClose}
                  open={open}
                  setOpen={setOpen}
                />
              );
            })}
        </div>
      </AppConainer>
    </>
  );
};
