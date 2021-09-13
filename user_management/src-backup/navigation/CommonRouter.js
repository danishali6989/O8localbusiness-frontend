import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AssignRole, DashBoard, ForgotPassword, Login, Report, Screen, Userlogin, AssignPermission, Permission, UserManagement, Setting } from '../pages';
import { PrivateRoutes } from './PrivateRoutes';
import { useUserData } from '../hooks/useUserData';
import { createBrowserHistory } from 'history'
export const CommonRouter = () => {
    // const location = useLocation();
    const userid = useUserData();
    const browserHistory = createBrowserHistory();
    return (

        <BrowserRouter>
            <Switch>
                {/* <PrivateRoutes exact path='/' component={DashBoard} />
                <PrivateRoutes path="/Setting" component={Setting} />
                <PrivateRoutes path="/user" component={UserManagement} />
                <PrivateRoutes exact path='/dashboard' component={DashBoard} />
                <PrivateRoutes exact path='/screen' component={Screen} />
                <PrivateRoutes exact path='/roles' component={AssignRole} />
                <PrivateRoutes exact path='/Report' component={Report} />
                <PrivateRoutes path="/user" component={UserManagement} />
                <PrivateRoutes path='/permission' component={Permission} />
                <PrivateRoutes path='/assignPermission' component={AssignPermission} /> */}




                <PrivateRoutes exact path='/permission'>
                    <Permission />
                </PrivateRoutes>


                <PrivateRoutes exact path='/assignPermission'>
                    <AssignPermission />
                </PrivateRoutes>

                <PrivateRoutes exact path='/Setting'>
                    <Setting />
                </PrivateRoutes>

                <PrivateRoutes exact path='/user'>
                    <UserManagement />
                </PrivateRoutes>

                <PrivateRoutes exact path='/dashboard'>
                    <DashBoard />
                </PrivateRoutes>

                <PrivateRoutes exact path='/screen'>
                    <Screen />
                </PrivateRoutes>

                <PrivateRoutes exact path='/Report'>
                    <Report />
                </PrivateRoutes>

                <PrivateRoutes exact path='/roles'>
                    <AssignRole />
                </PrivateRoutes>

                <PrivateRoutes exact path='/user'>
                    <UserManagement />
                </PrivateRoutes>

                <PrivateRoutes exact path='/'>
                    <DashBoard />
                </PrivateRoutes>

                <Route exact path='/Userlogin' component={Userlogin} />
                <Route exact path='/ForgotPassword' component={ForgotPassword} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/' component={Login} />
            </Switch>
        </BrowserRouter>

    )
}
