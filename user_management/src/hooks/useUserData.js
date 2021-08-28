import jwtDecode from 'jwt-decode';
import React, {useState, useEffect} from 'react';
export function useUserData() {

    function getIdToken() {
        console.log(" localStorage.token", localStorage.token)
        return localStorage.token;
    };
    function getTokenData() {

        try {
            
            const token = getIdToken();
            console.log("token", token)
            const decoded = jwtDecode(token);
            // console.log("decoded", decoded)
            if (!decoded) {
                return null;
            }
            return decoded;
        } catch (error) {
            console.log({error})
            return null;
        }
        
       
    };


    return getTokenData();
}
