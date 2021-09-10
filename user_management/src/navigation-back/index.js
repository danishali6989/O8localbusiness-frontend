import React from 'react';
import { CommonRouter } from './CommonRouter';
// import {BrowserRouter,Redirect} from 'react-router-dom';
// import {MainRouter} from './MainRouter';
// import {AuthRouter} from './AuthRouter';
// import {useSelector} from 'react-redux';
// import {useUserData} from '../hooks/useUserData';
// import {fetchScreensbyRole} from 'generic';
// import jwtDecode from 'jwt-decode';



export const Router = () => {
    // const user = null
  
    // const dispatch = useDispatch();
    // const auth = useSelector((state) => state.accountReducer);
    // useEffect(() => {
    //     if (auth.token !== null && auth.token !== "" && auth.token !== undefined) {
           
    //         getScreensbyRole()
    //     }
    // }, [auth])

    // const getScreensbyRole = async () => {
    //     const decoded = jwtDecode(auth.token);
    //     const data = {
    //         id: decoded.RoleId,
    //         token:auth.token
    //     }
    //     const result = await dispatch(fetchScreensbyRole(data));
    //     console.log("result", result)
    //     return  <Redirect to={{pathname: '/dashboard'}}/>
    // }

    // console.log("user////////////", user, auth.token !== null && auth.token !== "" && auth.token !== undefined)

    return   (
      
            <CommonRouter />
    
    ) 

    // return auth.token !== null && auth.token !== "" && auth.token !== undefined ? (
    //     <BrowserRouter>
    //         <MainRouter />
    //     </BrowserRouter>
    // ) : (
    //     <BrowserRouter>
    //         <AuthRouter />
    //     </BrowserRouter>
    // );
};
