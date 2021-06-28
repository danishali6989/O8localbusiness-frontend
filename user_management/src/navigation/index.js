import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MainRouter} from './MainRouter';
import {AuthRouter} from './AuthRouter';
import {useSelector} from 'react-redux';

export const Router = () => {
    const auth = useSelector((state) => state.accountReducer);
    return auth.token !== null && auth.token !== "" ? (
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
    ) : (
        <BrowserRouter>
            <AuthRouter />
        </BrowserRouter>
    );
};
