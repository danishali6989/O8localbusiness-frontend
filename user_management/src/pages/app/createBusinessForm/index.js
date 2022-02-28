import React, { useState, useEffect, createRef } from "react";
import { AppConainer } from "../../../components";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  BusinessCategoriesGetAllThunk,
  BusinessSubCategoriesGetAllThunk,
  addformgetAllThunk,
  addformThunk,
} from "generic";
import { useUserData } from "../../../hooks/useUserData";
import { useSelector } from "react-redux";
// import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Container, TextField } from "@material-ui/core";
// import { makeStyles } from "@mui/styles";

import $ from "jquery";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const useStyles = makeStyles({
  root: {
    minWidth: 700,
  },
});

export const CreateBusinessForm = () => {
  const user = useUserData();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [formValue, setformValue] = useState([]);
  const [newformfield, setformfield] = useState(null);
  const [selectCategory, setSelectcategory] = useState(null);
  const [selectSubcat, setSelectsbucat] = useState([]);
  const [subCategoriesName, setSubCategoriesName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAlias, setBusinessAlias] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobile, setMobile] = useState();
  const [postalCode, setPostalCode] = useState();
  const [Address, setAddress] = useState("");
  const [Categorieslist, setCategories] = React.useState([]);
  const [subCategorieslist, setSubCategories] = React.useState([]);
  const [open, setOpen] = useState(true);
  const [description, setDescription] = useState("");
  const fieldgetall = useSelector(
    (state) => state.permissionReducer.fieldGetAll
  );

  var fb = createRef();

  var options = {
    disableFields: ["autocomplete", "file", "number", "paragraph", "hidden"],
    // allowStageSort: false
    disabledActionButtons: ["data", "save", "clear"],
  };

  useEffect(() => {
    // buildform();
  }, [newformfield]);

  const buildform = () => {
    $(fb.current).formBuilder(options);
    var fbEditor = document.getElementById("build-wrap");
    var formBuilder = $(fbEditor).formBuilder();
    document.getElementById("getJSON").addEventListener("click", function () {
      var x = formBuilder.actions.getData("json");
      // localStorage.setItem("user", x);
      setformValue(JSON.parse(x));
    });

    document
      .getElementById("populateData")
      .addEventListener("click", function () {
        let temp;
        fieldgetall.map((item) => {
          // return
          // temp = JSON.parse(JSON.parse(item.formData));
          temp = item.fields;
        });
        formBuilder.actions.setData(temp);
      });
  };

  const onHandle = () => {
    buildform();
    setOpen(false);
  };

  React.useEffect(() => {
    apiCategories();
    apiSubcategries();
  }, []);

  const apiCategories = async () => {
    const result = await dispatch(BusinessCategoriesGetAllThunk());
    setCategories(result.payload);
  };

  const apiSubcategries = async () => {
    const result = await dispatch(BusinessSubCategoriesGetAllThunk());
    setSubCategories(result.payload);
  };

  const resultData = (id) => {
    const getData = subCategorieslist.filter(
      (x) => x.businessCategoryId === id
    );
    setSelectsbucat(getData);
  };

  const getAllfields = async () => {
    const result = await dispatch(addformgetAllThunk());
    return result;
  };
  const onSubmit = async () => {
    const data = {
      userId: parseInt(user.id),
      userName: userName,
      description: description,
      businessCategoryId: selectCategory,
      businessSubCategoryId: subCategoriesName,
      businessName: businessName,
      businessAlias: businessAlias,
      email: emailAddress,
      mobileNo: mobile,
      postalCode: postalCode,
      address: Address,
      form: formValue,
    };

    const result = await dispatch(addformThunk({ data }));
    if (result.payload === "Form Added") {
      alert("SucessFully Added");
      getAllfields();
      setSubCategoriesName("");
      setformValue("");
      setSelectcategory("");
      setSubCategoriesName("");
      setBusinessName("");
      setBusinessAlias("");
      setUserName("");
      setEmailAddress("");
      setMobile("");
      setPostalCode("");
      setAddress("");
      setDescription("");
    }
  };

  return (
    <>
      <AppConainer>
        <div style={{ padding: 20 }}>
          <h1>Create Business Form</h1>
          <Card className={classes.root}>
            <div
              style={{
                width: 650,
                justifyItems: "center",
                marginLeft: 25,
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <div>
                  <FormControl variant="outlined" style={{ width: 220 }}>
                    <InputLabel>Categories</InputLabel>
                    <Select
                      value={selectCategory}
                      onChange={(e) => setSelectcategory(e.target.value)}
                      label="Categories"
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {Categorieslist.map((item) => {
                        return (
                          <MenuItem
                            onClick={() => resultData(item.id)}
                            value={item.id}
                          >
                            {item.businessCategoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <FormControl variant="outlined" style={{ width: 220 }}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      SubCategories
                    </InputLabel>
                    <Select
                      //   labelId="demo-simple-select-outlined-label"
                      //   id="demo-simple-select-outlined"
                      onChange={(e) => setSubCategoriesName(e.target.value)}
                      label="SubCategories"
                    >
                      {selectSubcat.map((subitem) => {
                        return (
                          <MenuItem value={subitem.id}>
                            {subitem.businessSubCategoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <div style={{ paddingTop: 10 }}>
                  <TextField
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="Business Name"
                    defaultValue=""
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>

                <div style={{ paddingTop: 10, paddingBottom: 20 }}>
                  <TextField
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="Business Alias "
                    defaultValue=""
                    onChange={(e) => setBusinessAlias(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    fullWidth={100}
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="UserName"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="Email Address"
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <TextField
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="Mobile Number"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>

                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <TextField
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="Postal Code"
                    defaultValue=""
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  id="outlined-required"
                  label="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {true && (
                <div>
                  <div id="fb-editor" ref={fb} />
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <div style={{ paddingBottom: 20 }}>
                  <Button
                    variant="contained"
                    // onClick={GetResultApi}
                    onClick={onSubmit}
                    id="getJSON"
                    type="button"
                  >
                    Submit
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    onClick={getAllfields}
                    id="populateData"
                    type="button"
                  >
                    Populate
                  </Button>
                </div>
                <div>
                  {open && (
                    <Button
                      onClick={onHandle}
                      variant="contained"
                      color="primary"
                    >
                      Create Customize
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </AppConainer>
    </>
  );
};
