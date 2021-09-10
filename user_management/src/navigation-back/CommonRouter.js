import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AssignRole, DashBoard, ForgotPassword, Login, Report, Screen, Userlogin, UserManagement, Setting } from '../pages';
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
                {/* <PrivateRoutes exact path='/' component={DashBoard} handler={DashBoard} />
                <PrivateRoutes path="/Setting" component={Setting} handler={Setting} />
                <PrivateRoutes path="/user" component={UserManagement} handler={UserManagement} />
                <PrivateRoutes exact path='/dashboard' component={DashBoard} handler={DashBoard} />
                <PrivateRoutes exact path='/screen' component={Screen} handler={Screen} />
                <PrivateRoutes exact path='/roles' component={AssignRole} handler={AssignRole} />
                <PrivateRoutes exact path='/Report' component={Report} handler={Report} />
                <PrivateRoutes path="/user" component={UserManagement} handler={UserManagement} /> */}


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
