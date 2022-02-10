import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AssignRole, DashBoard, ForgotPassword, Login, Report, Screen, Userlogin, AssignPermission, Permission, UserManagement, Setting } from '../pages';
import { PrivateRoutes } from './PrivateRoutes';
import { useUserData } from '../hooks/useUserData';
import { createBrowserHistory } from 'history'
export const CommonRouter = () => {
    // const location = useLocation();
    const userid = useUserData();
    console.log("userlogin", userid)
    const browserHistory = createBrowserHistory();
    
    return (
   

        <BrowserRouter>
            <Switch>


                {/* <PrivateRoutes exact path='/permission'>
                    <Permission />
                </PrivateRoutes>


                <PrivateRoutes exact path='/assignPermission'>
                    <AssignPermission />
                </PrivateRoutes> */}

                <PrivateRoutes exact path='/Setting'>
                    <Setting />
                </PrivateRoutes>

                <PrivateRoutes exact path='/UserManagement'>
                    <UserManagement />
                </PrivateRoutes>

                <PrivateRoutes exact path='/dashboard'>
                    <DashBoard />
                </PrivateRoutes>
{/* 
                <PrivateRoutes exact path='/screen'>
                    <Screen />
                </PrivateRoutes> */}

                <PrivateRoutes exact path='/Report'>
                    <Report />
                </PrivateRoutes>

                <PrivateRoutes exact path='/Roles'>
                    <AssignRole />
                </PrivateRoutes>

                <PrivateRoutes exact path='/UserManagement'>
                    <UserManagement />
                </PrivateRoutes>

                <PrivateRoutes exact path='/'>
                    <DashBoard />
                </PrivateRoutes>

                
                <Route exact path='/permission' component={Permission} />
                <Route exact path='/assignPermission' component={AssignPermission} />
                <Route exact path='/screen' component={Screen} />
                {/* <Route exact path='/user' component={UserManagement} />
                <Route exact path='/Setting' component={Setting} />
                <Route exact path='/screen' component={Screen} />
                <Route exact path='/Report' component={Report} />
                <Route exact path='/Roles' component={AssignRole} />
                <Route exact path='/user' component={UserManagement} />
                <Route exact path='/' component={DashBoard} /> */}


                
                <Route exact path='/Userlogin' component={Userlogin} />
                <Route exact path='/ForgotPassword' component={ForgotPassword} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/' component={Login} />

            </Switch>
        </BrowserRouter>

    )
}
