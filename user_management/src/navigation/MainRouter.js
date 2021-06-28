import React, {useEffect} from 'react';
import {DashBoard, UserManagement, ForgotPassword,Screen,AssignRole} from '../pages';
import {Route, Switch,withRouter} from 'react-router-dom';
import { EditUser } from '../pages/app/EditInfo';

export const MainRouter = withRouter(({location}) => {

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
        <>

            <Switch>
             <Route exact path='/dashboard' component={DashBoard} />
                <Route exact path='/UserManagement' component={UserManagement} />
                <Route  exact path='/Screen' component={Screen}/>
                <Route   exact path='/AssignRole' component={AssignRole} />
                <Route exact path='/ForgotPassword' component={ForgotPassword} />
                <Route exact path='/' component={DashBoard} />
                <Route exact path='/editUser/:id'  component={EditUser} />
            </Switch>
        </>
    );
});
