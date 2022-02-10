import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "clear",
  },
}));

export const ActionComponent = ({
  isChecked,
  handleEdit,
  isDeleted,
  isCurrentRowEditing,
  params,
  handleDelete,
  handleSubmit,
  handleStatus,
  handlePassword,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(isChecked);
  const [isdelete, setdelete] = useState(isDeleted);
  const [msgOpen, setMsgOpen] = useState(false);
  const handlemsgBoxOpen = () => {
    setMsgOpen(false);
    handleStatus();
  };

  const changeDelete = (event) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDelete();
            setdelete(!event.target.checked);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const changeDeleteActivate = (event) => {
    confirmAlert({
      title: "Confirm to Activate",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDelete();
            setdelete(!event.target.checked);
          },
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const changeStatusMain = () => {
    confirmAlert({
      title: "Confirm to Activate",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handlemsgBoxOpen(),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  const changeStatuschange = () => {
    confirmAlert({
      title: "Confirm to Deactivate",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handlemsgBoxOpen(),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {isCurrentRowEditing ? (
        <>
          <Button>
            <Icon
              onClick={() => {
                handleSubmit();
              }}
              className="list-item-icon text-16"
              color="action"
            >
              Done
            </Icon>
          </Button>
          <Button>
            <Icon
              onClick={() => {
                params.api.stopEditing(true);
              }}
              className="list-item-icon text-16"
              color="action"
            >
              Close
            </Icon>
          </Button>
        </>
      ) : (
        <>
          <IconButton
            edge="start"
            aria-label="open drawer"
            variant="contained"
            color="primary"
            onClick={() => {
              handleEdit();
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <FormControlLabel
            style={{ fontSize: 20 }}
            control={
              <Switch
                checked={!checked}
                onChange={checked ? changeStatusMain : changeStatuschange}
                color="primary"
                name="checkedB"
                label="Status"
                inputProps={{ "aria-label": "primary checkbox" }}
                style={{ fontSize: 25 }}
              />
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={!isdelete}
                onChange={isdelete ? changeDelete : changeDeleteActivate}
                name="isdelete"
                style={{ fontSize: 20 }}
              />
            }
          />
          <IconButton
            edge="start"
            aria-label="open drawer"
            variant="contained"
            color="primary"
            onClick={() => {
              handlePassword();
            }}
          >
            <VpnKeyIcon style={{ fontSize: 20 }} />
          </IconButton>
        </>
      )}
    </div>
  );
};
