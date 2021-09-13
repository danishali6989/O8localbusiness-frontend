import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ActionComponent, AppConainer } from '../../../components'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import avatarUserIcon from '../../image/User-Icon.png'
import { SignUp } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleThunk, getAlluserDatathunk, editUserThunk } from 'generic/src/redux/reducers/userReducer';
import { deleteUserThunk } from 'generic'
import Switch from '@material-ui/core/Switch';
import { useUserData } from '../../../hooks/useUserData'
import { useHistory } from 'react-router';
import { toggelStatusThunk } from 'generic';
import { DailogeBox } from '../../../components/DailogBox';

const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },


    container: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    submit: {
        margin: theme.spacing(3, 1, 2),
    },
}))





export const UserManagement = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const authData = useUserData()
    // console.log("huyuy8y88",authData)
    const [open, setOpen] = useState(false);
    const [paswordOpen, setPaswordOpen] = useState(false)
    const [gridApi, setGridApi] = useState(null);


    const handleClickOpen = () => {
        setUserEditData(null)
        setOpen(true);


    }
    const handleClose = () => {
        setOpen(false);
    };



    const handlePasswordOpen = () => {
        setPaswordOpen(true)
    }

    const handlePasswordClose = () => {
        setPaswordOpen(false)
    }


    const [userEditData, setUserEditData] = useState(null);
    const user = useSelector((state) => state.userReducer.data)
    const created = useSelector((state) => state.userReducer)
    console.log("user", created)


    const onGridReady = (params) => {

        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    }

    useEffect(async () => {
        const token = window.localStorage.getItem('token')

        const CompanyId = authData.CompanyId;
        console.log("huyuy8y88", CompanyId)

        dispatch(getRoleThunk())
        const result =await  dispatch(getAlluserDatathunk())

        console.log(result)


    }, [])






    // const ImageShow = (params) => {

    //     return (
    //         <span >
    //             <Avatar alt="Remy Sharp" style={{marginTop: 4}} src={avatarUserIcon} className={classes.small} />
    //         </span>
    //     )
    // };





    const actionHeader = () => {
        return (
            <div style={{
                display: 'flex',
                flex: 1,
                width: 170,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <label>Edit</label>
                <label>Status</label>
                <label>Delete</label>
            </div>
        )
    }


    var tempdata = []
    var tempLocation = [];
    var tempLocationObj = [];
    var tempColor = []
    var colors = [
        { value: "#1dab43", name: 'Green' },
        { value: "#cc1427", name: 'Red' },
        { value: "#7f0c94", name: 'Purple' },
        { value: "#2210c7", name: 'Blue' },
        { value: "#eb0eca", name: 'Pink' },
        { value: "#b7c223", name: 'Yellow' },
    ]
    colors.map((u, i) => {
        tempColor.push(u.name)
    })

    function ActionCellRenderer(params) {
        let eGui = document.createElement("div");
        let editingCells = params.api.getEditingCells();
        // checks if the rowIndex matches in at least one of the editing cells
        let isCurrentRowEditing = editingCells.some((cell) => {
            return cell.rowIndex === params.node.rowIndex;
        });

        const [checked, setChecked] = useState(true);
        const changeStatus = async (userData, process) => {
            // console.log(userData)

            // setMsgOpen(true)
            const token = window.localStorage.getItem('token')
            const id = userData.id;
            let status = 1;
            if (userData.status === 2 || userData.status===3) {
                status = 1;
            } else {
                status = 2;
            }
            const data = {
                status: status
            }
            const result = await dispatch(toggelStatusThunk({ data, id, token }))
            console.log("result", result)



            //    gridApi.redrawRows();

        }



        const EditSubmitHandler = (data) => {
            console.log(data)
            setUserEditData(data)
            setOpen(true)





        }
        const deleteHandler = async (params) => {

            // alert("<h1>Do you want to delete this user !!!</h1>")
            const id = params.id
            console.log("zzzzz", id)
            const token = window.localStorage.getItem('token')
            let status = 1
            if (params.status === 3) {
                status = 1;
            } else {
                status = 3;

            }
            const data = {
                status: status
            }
            // const result = await dispatch(deleteUserThunk({ id, token }))
            console.log("reqdata", { data, id, token })
            const result = await dispatch(toggelStatusThunk({ data, id, token }))
            console.log(result)
            if (result.payload == "Deleted") {

                alert("sucessfully deleted data")

            }


        }


        const changePassword = () => {
            setPaswordOpen(true)
        }
        return (
            <ActionComponent


                handleEdit={() => {
                    EditSubmitHandler(params.data)
                }}
                isChecked={params.data.status === 1 ? false : true}
                isDeleted={params.data.status === 3 ? false : true}

                handleDelete={() => { deleteHandler(params.data) }}
                handleStatus={() => changeStatus(params.data)}
                handlePassword={changePassword}
            />
        )



    }

    const onRowValueChanged = (params) => {


    };
    const fieldRender = (event) => {
        let color = ""
        
        if (event.colDef.field === "bg_color") {

            return `<div style="background-color:red;width:100%;height:100%;"></div>`;
        } else {
            if (event.data.status === 3) {
                return `
				<div
				style="
						content: '';
						width: 120%;
						height: 1px;
						background: #bfbdbd;
						display: block;
						position: relative;
						top: 20px;
						padding-left:17px;padding-right:17px;"
				></div>
				<div style="width:100%;height:100%;padding-left:17px;padding-right:17px;color:#bfbdbd">${event.value}</div>
				`;
            } else if (event.data.status === 2) {
                return `<div style="color:#dddddd;width:100%;height:100%;padding-left:17px;padding-right:17px;">${event.value}</div>`;
            } else {
                return `<div style="width:100%;height:100%;padding-left:17px;padding-right:17px;">${event.value}</div>`;
            }
        }
    };


    const cellStyle = (params) => {
        if (params.data.status == "off") {
            //Here you can check the value and based on that you can change the color
            //mark police cells as red
            return {
                color: '#dddddd',
                'padding-left': '0px',
                'padding-right': '0px'
            };
        } else if (params.data.isDeleted === true) {
            return {
                'padding-left': '0px',
                'padding-right': '0px'
            }
        } else {
            return {
                'padding-left': '0px',
                'padding-right': '0px'
            }
        }
    }
    var tempdata = []
    user && user.map((item, index) => {
        // console.log("item", item)
        tempdata.push({
            app_id: item.app_id,
            callStatus: false,
            companyId: item.companyId,
            companyName: null,
            email: item.email,
            finance_year: item.finance_year,
            id: item.id,
            image: null,
            imageUrl: null,
            ip_Address: item.ip_Address,
            mobile: item.mobile,
            otp: 0,
            password: item.password,
            roleId: item.roleId,
            roleName: item.roleName,
            status: item.status,

            userName: item.userName,
            full_Name: item.usr_FName + "  " + item.usr_LName,
            usr_FName: item.usr_FName,
            usr_LName: item.usr_LName,
        });
        return 0;
    })


    var gridOptions = {
        onCellClicked(params) {
            if (params.column.colId === "action" && params.event.target.dataset.action) {
                let action = params.event.target.dataset.action;
                if (action === "create") {

                    params.api.startEditingCell({
                        rowIndex: params.node.rowIndex,
                        // gets the first columnKey
                        colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
                    });
                }

                if (action === "status") {


                }
                if (action === "delete") {


                    // params.api.applyTransaction({
                    // 	remove: [params.node.data]
                    // });
                }

                if (action === "update") {


                }

                if (action === "cancel") {
                    params.api.stopEditing(true);
                }
            }
        },

        onGridReady: onGridReady,
        onRowValueChanged: onRowValueChanged,
        onRowEditingStarted: (params) => {
            params.api.refreshCells({
                columns: ["action"],
                rowNodes: [params.node],
                force: true
            });
        },
        onRowEditingStopped: (params) => {
            params.api.refreshCells({
                columns: ["action"],
                rowNodes: [params.node],
                force: true
            });
        },
        module: AllCommunityModules,
        // editType: "fullRow",
        // defaultColDef: {
        //     editable: true
        // },
        frameworkComponents: {
            actionCellRenderer: ActionCellRenderer,
            actionHeader: actionHeader
        },
        pagination: true,

        columnDefs: [

            {
                field: "email",
                filter: 'agTextColumnFilter',
                sortable: true,
                cellRenderer: fieldRender,
                cellStyle: cellStyle
            },
            {
                field: 'full_Name',
                sortable: true,
                width: 150,
                cellRenderer: fieldRender,
                cellStyle: cellStyle
            },


            {
                field: "userName",
                sortable: true,
                width: 150,
                cellRenderer: fieldRender,
                cellStyle: cellStyle
            },
            {
                field: "mobile",
                sortable: true,
                width: 150,
                cellRenderer: fieldRender,
                cellStyle: cellStyle
            },


            {
                headerName: "Action",
                headerComponent: "actionHeader",
                cellRenderer: "actionCellRenderer",
                editable: false,
                colId: "action"
            }
        ],
        rowData: tempdata,


    };



    return (
        <AppConainer  screename={"User"}>
            <Container maxWidth="lg" className={classes.container}>
                {/* <h1>UserManagement</h1> */}
                <div style={{ marginBottom: 10, marginTop: 15}}>
                    <Button variant="contained" color="primary" 
                        style={{ justifyContent: 'center', alignItems: 'center' ,fontSize:12}}
                        onClick={handleClickOpen}
                    >
                        Add User
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center' ,
                        marginLeft:10,marginRight:10,fontSize:12}}
                        onClick={handleClickOpen}
                    >
                        Disabled User
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center' ,
                        marginLeft:10,marginRight:10,fontSize:12}}
                        onClick={handleClickOpen}
                    >
                        Deleted User
                    </Button>


                </div>
                {/* AgGridReact  Table*/}
                <div className="ag-theme-alpine" style={{ height:600, width: 1250, justifyContent: 'center' ,marginTop:15}}>
                    <AgGridReact
                        onGridReady={onGridReady}
                        
                        gridOptions={gridOptions}
                        alwaysShowHorizontalScroll={true}
                        pagination={true} paginationPageSize="15" 
                        deltaRowDataMode={true}
                    // frameworkComponents={{
                    //     totalValueRenderer: totalValueRender,
                    //     ImageShow: ImageShow
                    // }}
                    // rowData={user}
                    // pagination={true}
                    // onGridReady={onGridReady}
                    // defaultColDef={{resizable: true}} />
                    />
                    {/* <AgGridColumn field="Images" cellRenderer="ImageShow" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="usr_FName" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="usr_LName" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="email" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="mobile" style={{width: 1050}} sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="Action" cellRenderer='totalValueRenderer' id={'id'}>
                        </AgGridColumn>

                    </AgGridReact> */}
                </div>

                {/* <!----------------------------password dailogue --------------------------> */}
                <DailogeBox
                    paswordOpen={paswordOpen}
                    handlePasswordOpen={handlePasswordOpen}
                    handlePasswordClose={handlePasswordClose}
                    pass={'pass'}

                />

                <SignUp handleClose={handleClose} open={open} editData={userEditData} />

            </Container>
        </AppConainer>
    );
}