
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AppConainer } from '../../../components'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Avatar from '@material-ui/core/Avatar';

import avatarUserIcon from '../../image/User-Icon.png'
import { SignUp } from './signup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, getAlluserDatathunk,deleteUserThunk } from 'generic/src/redux/reducers/userReducer';
import { useHistory } from 'react-router';

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
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
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
}));
// console.log(useStyles)




export const UserManagement = () => {
    const classes = useStyles();
    const dispatch=useDispatch()
const history=useHistory()
    const user=useSelector((state)=>state.userReducer.data)
console.log("user",user)
    // const [age, setAge] = React.useState('');
    // const [images, setImages] = useState('')
    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    }

    // const onHandleImageChange = (e) => {
    //     console.log("e", e.target.files[0])
    //     const file = e.target.files[0]
    //     if (!file) {
    //         return null;
    //     }
    //     var fReader = new FileReader();
    //     fReader.readAsDataURL(e.target.files[0]);
    //     fReader.onloadend = function (event) {
    //         setImages(event.target.result);
    //     }
    //     // var fileName = e.target.files[0].name;
    //     // const validExtensions = ['pdf', 'jpg'];
    //     // var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    //     // var isValid = true;

    // }

useEffect(()=>{
     fethgetAlldata()
     dispatch(getAlluserDatathunk())
    


},[])
const fethgetAlldata=async()=>{
  await  dispatch(getAllData())


}






    const totalValueRender = (ids) => {
        const id=ids.data.id  ///id of user
        // console.log('id',id)

        const buttonClicked = () => {
            console.log('aaaaaaaaaa',id)
            history.push(`/editUser/${id}`)


        }

        const deleteHandler=()=>{
            // console.log("hiiiiii")
            var data={
                id:id
            }
            console.log('sss',id)
            dispatch(deleteUserThunk(data))

        }
        return (
            <>
                <span >
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        variant="contained" 
                        color="primary"
                        onClick={() => buttonClicked(user.id)}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </span>
                <span >
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        variant="contained" 
                        color="secondary"
                        onClick={deleteHandler}
                    >
                        <DeleteOutline fontSize="small" />
                    </IconButton>

                </span>

            </>

        )
    }


    const ImageShow = (params) => {

        return (
            <span >
                <Avatar alt="Remy Sharp" style={{marginTop:4}} src={avatarUserIcon} className={classes.small} />
            </span>
        )
    };


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <AppConainer>
            <Container maxWidth="lg" className={classes.container}>
                {/* <h1>UserManagement</h1> */}
                <div style={{ marginBottom: 10, marginTop: 10 }}>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onClick={handleClickOpen}
                         >
                        Add User
                    </Button>
                </div>
                {/* AgGridReact  Table*/}
                 <div className="ag-theme-alpine" style={{ height: 450, width: 1070, justifyContent: 'center' }}>
                    <AgGridReact
                        frameworkComponents={{
                            totalValueRenderer: totalValueRender,
                            ImageShow: ImageShow
                        }}
                        rowData={user}
                        pagination={true}
                        onGridReady={onGridReady}
                        defaultColDef={{ resizable: true }} >

                        <AgGridColumn field="Images" cellRenderer="ImageShow" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="usr_FName" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="usr_LName" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="email" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="mobile" style={{ width: 1050 }} sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="Action" cellRenderer='totalValueRenderer' id={'id'}>
                        </AgGridColumn>

                    </AgGridReact>
                </div>
                 
                <SignUp  handleClose={handleClose} open={open}/>

            </Container>
        </AppConainer>
    );
}
