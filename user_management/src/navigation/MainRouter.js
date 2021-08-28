import React, { useEffect, } from 'react';
import { DashBoard, UserManagement, ForgotPassword, Screen, AssignRole, Report } from '../pages';
import { Route, Switch, withRouter, Router } from 'react-router-dom';
import { EditUser } from '../pages/app/EditInfo';
import { useUserData } from '../hooks/useUserData';
import { PrivateRoutes } from './PrivateRoutes';

import { Login } from '../pages/auth/login'
import { PublicRoute, PrivateRoute } from 'react-private-public-route'

export const MainRouter = withRouter(({ location }) => {
    const user = useUserData();
    console.log("userlog", user)

    useEffect(() => {
        const getPassword = () => {
            try {
                const session = localStorage.getItem('user_session');
                if (session !== undefined) {

                }
            } catch (error) {
                console.log('getPassword', error);
            }
        };
        getPassword();
    });


    return (
   

            <Switch>

                <Route exact path='/dashboard' component={DashBoard} />
                {/* <Route exact path='/UserManagement' component={UserManagement} /> */}
                <Route exact path='/Screen' component={Screen} />
                <Route exact path='/Roles' component={AssignRole} />
                <Route exact path='/reports' component={Report} />
                <Route exact path='/' component={DashBoard} />
                <PrivateRoutes path="/UserManagement" component={UserManagement} />
                <Route exact path='/login' component={Login} />
            </Switch>


    );
});
