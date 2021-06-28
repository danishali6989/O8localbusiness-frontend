import React from 'react'
import { AppConainer } from '../../../components';
import { Container } from '@material-ui/core';
import { NewCard } from './card';


export const AssignRole = () => {
   

    return (
        <>
            <AppConainer>
                <Container>
                    {/* <h1>hello</h1> */}
                    <NewCard />
                </Container>
            </AppConainer>
        </>
    )
}


