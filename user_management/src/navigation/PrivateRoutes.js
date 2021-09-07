import React, { Component, useState } from 'react'
import { login } from '../pages/auth/login'
import { useUserData } from '../hooks/useUserData';
import { Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';



export const PrivateRoutes = ({ children, ...rest }) => {
    useSelector(state => console.log(state))
    const screenByRole = useSelector(state => state.screenReducer.screensbyRole?.screens);
    const useriD = useUserData();
    console.log({ rest, screenByRole })
    const history = useHistory()
    const isAuthenticated = useriD;
    let status = false;

    if (screenByRole) {
        screenByRole.map((item) => {
            if (item.screenUrl === rest.path) {
                status = true;
                return;
            };
        });
    }

    return (<Route {...rest} render={() => {
        if (isAuthenticated && rest.path === '/' && !status) {
            return children;
        };
        if (isAuthenticated && status) {
            return children;
        } else if (isAuthenticated && !status) {
            return history.goBack();
        } else {
            return <Redirect to={{ pathname: '/Login' }} />;
        };
    }} />)
};
